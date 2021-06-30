const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bcrypt = require('bcrypt')
const cors = require('cors')
const cookieparser = require('cookie-parser')
const corsOpts = {
    origin: '*',
    optionsSuccessStatus: 200
}
const https = require('https')
const fs = require('fs')

const { sign, verify } =  require('jsonwebtoken')
const constcls = require('../constants')
const constants = new constcls()
var idgen = require('../idgen');
var tokenizer = require('../tokenizer v2')

require('dotenv').config()

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'aperii';
const client = new MongoClient(url);
// Use connect method to connect to the server
client.connect(function (err) {
    //assert.equal(null, err);
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    const users = db.collection('user');
    const posts = db.collection('posts');
    const cdn = db.collection('cdn');
    const relationships = db.collection('relationships')
    const noti = db.collection('notifications')
    const apps = db.collection('applications')
    const grants = db.collection('oauth')

    const express = require('express')
    const app = express()

    var auth = function (req, res, next) {
        var unauth = {
            status: 401,
            error: 'Unauthorized'
        }
        const tok = req.headers.authorization
        if (!tok) {
            res.status(401).send(unauth)
            return
        }

        users.findOne({
            token: tok
        }).then(u => {
            if (!u) {
                res.status(401).send(unauth)
                return
            }

            if(u.suspended == true){
                res.status(401).send(unauth)
                return
            }
    
            req.user = u
            
            next()
        })
    }

    var softAuth = function (req, res, next) {
        var unauth = {
            status: 401,
            error: 'Unauthorized'
        }
        const tok = req.headers.authorization
        

        users.findOne({
            token: tok
        }).then(u => {
            if(u) req.user = u
            
            next()
        })
    }

    app.use(express.json({limit: "8mb"}))
    app.use(cors(corsOpts))
    app.use(cookieparser())

    async function genRand(chars, length) {
        var token = ''
        for (let i = 0; i < length; i++) {
            var rn = Math.floor(Math.random() * chars.length)
            token += chars.slice(rn, rn + 1)
        }
        var user = await apps.findOne({
            secret: token
        })
        if (user) {
            return genToken(chars, length)
        } else {
            return token
        }
    }

    async function genId(type, author) {
        var id = idgen(type)
        var col = type == 'user' ? users : type == 'post' ? posts : type == 'noti' ? noti : undefined
        var filter = type == "post" ? {
            id: id,
            author: author
        } : {
            id: id
        }
        var obj = await col.findOne(filter)
        if (obj) {
            return genId(type)
        } else {
            return id
        }
    }

    app.post('/auth/signup', cors(corsOpts), async (req, res) => {
        console.log(process.env.ACCESS_TOKEN_SECRET)
        const {
            email,
            displayName,
            username,
            password
        } = req.body

        if (email && displayName && username && password) {

            var user = await users.findOne({
                username: username.toLowerCase()
            })
            if (user) {
                res.status(400).send({
                    status: 400,
                    error: 'Username already taken'
                });
                return
            }

            var user = await users.findOne({
                email: email
            })
            if (user) {
                res.status(400).send({
                    status: 400,
                    error: 'Email already in use'
                });
                return
            }

            var usernameRegex = /^(?=.*[a-z])?(?=.*[A-Z])?(?=.*\d)?(?!.*[ ])[A-Za-z\d_]{4,32}$/g
            var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g
            var emailRegex = /^[a-zA-Z.0-9]+@[a-zA-Z]+\.(com|org|net|xyz|dev|gov|me|tv|se|info|co\.uk|co|uk|us)$/g
            if (username.length < 4 || username.length > 32) {
                res.status(400).send({
                    status: 400,
                    error: 'Username must be between 4 and 32 characters long'
                });
                return
            }
            if (displayName.length < 4 || displayName.length > 64) {
                res.status(400).send({
                    status: 400,
                    error: 'Display name must be between 4 and 32 characters long'
                });
                return
            }
            if (!usernameRegex.test(username)) {
                res.status(400).send({
                    status: 400,
                    error: 'Username must only contain "A-Z", "a-z", "0-9" and "_"'
                });
                return
            }
            if (!passwordRegex.test(password)) {
                res.status(400).send({
                    status: 400,
                    error: 'Password must be at least 8 characters, contain at least 1 lowercase letter, 1 uppercase letter, a number, and a special character'
                });
                return
            }
            if (!emailRegex.test(email)) {
                res.status(400).send({
                    status: 400,
                    error: 'Invalid email address'
                });
                return
            }
            var userid = await genId('user')
            var token = await sign({id: userid, timestamp: Date.now()}, process.env.ACCESS_TOKEN_SECRET)
            bcrypt.hash(password, 10, async (err, hash) => {
                users.insertOne({
                    id: userid,
                    joinedTimestamp: Date.now(),
                    email: email,
                    displayName: displayName,
                    username: username.toLowerCase(),
                    password: hash,
                    bio: "",
                    banner: "",
                    verifiedEmail: false,
                    suspended: false,
                    flags: 0,
                    token: token
                }, (err, result) => {

                    res.status(200).send({
                        username: username.toLowerCase(),
                        token: token
                    })
                })
            })
        } else {
            res.status(400).send({
                status: 400,
                error: 'Missing display name, username, email, or password'
            });
            return
        }
    })

    app.post('/auth/login', cors(corsOpts), async (req, res) => {
        const {
            username,
            password
        } = req.body
        var user = await users.findOne({
            username: username
        })
        if (!user) {
            res.status(400).send({
                status: 400,
                error: 'No user found with that username'
            });
            return
        }
        bcrypt.compare(password, user.password,
            async function (err, result) {
                if (result == true) {
                    
                    res.send({
                        username: user.username,
                        token: user.token
                    })
                } else {
                    res.status(401).send({
                        status: 401,
                        error: 'Incorrect password'
                    })
                }
            })
    })

    app.post('/auth/validate', cors(corsOpts), async (req, res) => {
        var tok = req.headers.authorization
        if (!tok) {
            res.status(401).send({
                status: 401,
                error: 'Unauthorized'
            })
        }
        var user = await users.findOne({
            token: tok
        })
        if (!user) {
            res.status(401).send({
                status: 401,
                error: 'Unauthorized'
            })
        return
        }
        res.status(200).send({
            username: user.username,
            token: user.token
        })
    })

    app.get('/me', auth, async (req, res) => {
        delete req.user.token
        delete req.user.password
        delete req.user['_id']

        res.send(req.user)
    })

    app.get('/users/:id', auth, async (req, res) => {
        const { id } = req.params
        var u = await users.findOne({id : id})
        if(!u) {
            res.status(404).send({
                status: 404,
                error: 'User not found'
            });
            return
        }
        delete u.token
        delete u.password
        delete u['_id']

        res.send(u)
    })

    app.get('/hello', async (req, res) => {
        res.send('world')
    })

    app.get('/profiles/:username', softAuth, async (req, res) => {
        const { username } = req.params
        var u = await users.findOne({username : username})
        if(!u) {
            res.status(404).send({
                status: 404,
                error: 'User not found'
            });
            return
        }
        if (!req.user || !req.user.admin) {
            delete u.token
            delete u.password
            delete u.email
            delete u['_id']
            var allPosts = await posts.find({author: u.id}).toArray()
            console.log(allPosts)
            allPosts.map(p => {
                aProto = JSON.stringify(u)
                p.author = JSON.parse(aProto)
                delete p.author.token
                delete p.author.password
                delete p.author.email
                delete p.author['_id']
                delete p["_id"]
            })
            
            u.posts = u.suspended != true ? allPosts : []
            res.send(u)
        } else {
            var allPosts = await posts.find({author: u.id}).toArray()
            allPosts.map(p => {
                aProto = JSON.stringify(u)
                p.author = JSON.parse(aProto)
                delete p.author.token
                delete p.author.password
                delete p.author.email
                delete p.author['_id']
                delete p["_id"]
            })
            
            u.posts = u.suspended != true ? allPosts : []
            res.send(u)
        }
        
    })

    app.post('/users/:id/posts', auth, async (req, res) => {
        const { body, imageBuffer } = req.body
        const { id } = req.params
        if(!body){
            if(id != req.user.id) {
                res.status(400).send({
                    status: 400,
                    error: 'Invalid form body'
                })
                return
            }
        }

        if(id != req.user.id) {
            res.status(401).send({
                status: 401,
                error: 'Unauthorized'
            })
            return
        }

        if(body.length < 1) {
            res.status(400).send({
                status: 400,
                error: 'Invalid form body: Body cannot be nothing'
            })
            return
        }

        if(body.length > 256) {
            res.status(400).send({
                status: 400,
                error: 'Invalid form body: Body must be limited to 256 characters'
            })
            return
        }
        var postID = await genId('post', req.user.id)
        var toks = tokenizer(body)
        if(toks.filter(t => t.type == 1).length > 0){
            toks.filter(t => t.type == 1).forEach(async tok => {
                var user = await users.findOne({username: tok.value.toLowerCase().slice(1)})
                if(user){
                    noti.insertOne({
                        owner: user.id,
                        id: await genId('noti'),
                        type: 0,
                        createdTimestamp: Date.now(),
                        read: false,
                        props: {
                            post_author_id: req.user.id,
                            post_id: postID
                        }
                    })
                }
            })
        }
        posts.insertOne({
            id: postID,
            createdTimestamp: Date.now(),
            author: req.user.id,
            body,
            media: [imageBuffer]
        }, (err, result) => {
            res.status(200).send(result.ops)
        })
    })

    app.patch('/users/:id', auth, async (req, res) => {
        const { avatar, displayname, username, bio } = req.body
        const { id } = req.params
        const errors = []
        if(req.user.id != id) {
            res.status(401).send({
                status: 401,
                error: 'Unauthorized'
            })
            return
        }

        if (avatar) {
            var datauriRegex = /^data:image\/(jpeg|jpg|png|gif);base64,[\d\D]+$/g
            if (!datauriRegex.test(avatar)) {
                errors.push({
                    status: 400,
                    error: 'Avatar needs to be a valid data uri scheme, only allowing jpeg, png, and gif formats',
                    field: 'avatar'
                })
            }
            if (errors.filter(e => e.field == "avatar").length < 1) {
                var formats = ['jpeg', 'jpg', 'png', 'gif']
                var format = avatar.split(':')[1].split(';')[0].split('/')[1].toLowerCase()
                if (!formats.includes(format)) {
                    errors.push({
                        status: 400,
                        error: 'Avatar needs to be a valid data uri scheme, only allowing jpeg, png, and gif formats',
                        field: 'avatar'
                    })
                }
                var av = await cdn.findOne({
                    type: 'avatar',
                    owner: id
                })
                if (errors.filter(e => e.field == "avatar").length < 1) {
                    if (av) {
                        cdn.findOneAndUpdate({
                            type: 'avatar',
                            owner: id
                        }, {
                            $set: {
                                data: avatar.split('base64,')[1],
                                format
                            }
                        })
                        users.findOneAndUpdate({
                            id
                        }, {
                            $set: {
                                avatar: `https://aperii.com/api/usercontent/avatars/${id}`
                            }
                        })
                    } else {
                        cdn.insertOne({
                            type: 'avatar',
                            owner: id,
                            data: avatar.split('base64,')[1],
                            format
                        })
                        users.findOneAndUpdate({
                            id
                        }, {
                            $set: {
                                avatar: `https://aperii.com/api/usercontent/avatars/${id}`
                            }
                        })
                    }
                }
            }
        }

        if(username){
            var usernameRegex = /^(?=.*[a-z])?(?=.*[A-Z])?(?=.*\d)?(?!.*[ ])[A-Za-z\d_]{4,32}$/g
            if(!usernameRegex.test(username)){
                errors.push({
                    status: 400,
                    error: 'Does not meet username requirements',
                    field: 'username'
                })
                
            }

            
            if (errors.filter(e => e.field == 'username').length < 1) {
                var u = await users.findOne({
                    username: username
                })
                if (u) {
                    errors.push({
                        status: 400,
                        error: 'Username already taken',
                        field: "username"
                    })
                }
                if (errors.filter(e => e.field == 'username').length < 1) {
                users.findOneAndUpdate({
                    id: id
                }, {
                    $set: {
                        username: username.toLowerCase()
                    }
                })
            }
            }
        }

        if(bio){
            var usernameRegex = /^[\d\D]{0,64}$/g
            if(!usernameRegex.test(bio)){
                errors.push({
                    status: 400,
                    error: 'Bio exceeds 64 character limit',
                    field: 'bio'
                })
                
            }

            if (errors.filter(e => e.field == 'bio').length < 1) {
                users.findOneAndUpdate({
                    id: id
                }, {
                    $set: {
                        bio: bio
                    }
                })
            }
        }

        if(displayname){
            if (displayname.length < 4 || displayname.length > 32) {
                errors.push({
                    status: 400,
                    error: 'Display name must be between 4 and 32 characters long',
                    field: 'displayname'
                });
            }
            if(errors.filter(e => e.field == 'displayname').length < 1){
                users.findOneAndUpdate({id: id}, {$set:{displayName: displayname}})
            }
        }

        var u = await users.findOne({
            id
        })
        delete u.token
        delete u.password
        delete u.email
        delete u["_id"]

        if(errors.length > 0) res.status(errors[0].status)
        res.send(errors.length < 1 ? {
            profile: u
        } : {
            profile: u,
            errors
        })
    })

    // app.patch('/users/:id/username', auth, async (req, res) => {
    //     const { username } = req.body
    //     if(!username){
    //         if(id != req.user.id) {
    //             res.status(400).send({
    //                 status: 400,
    //                 error: 'Invalid form body'
    //             })
    //             return
    //         }
    //     }
    //     var us = await collection.findOne({username: username.toLowerCase()})
    //     if(us){
    //         res.status(400).send({
    //             status: 400,
    //             error: 'Username already taken'
    //         })
    //         return
    //     }
    //     const { id } = req.params
    //     if(id != req.user.id) {
    //         res.status(401).send({
    //             status: 401,
    //             error: 'Unauthorized'
    //         })
    //         return
    //     }

    //     var usernameRegex = /^(?=.*[a-z])?(?=.*[A-Z])?(?=.*\d)?(?!.*[ ])[A-Za-z\d_]{4,32}$/g

    //     if (!usernameRegex.test(username)) {
    //         res.status(400).send({
    //             status: 400,
    //             error: 'Username must only contain "A-Z", "a-z", "0-9" and "_"'
    //         });
    //         return
    //     }

    //     collection.findOneAndUpdate({id: id}, {$set: {username: username.toLowerCase()}}, async (err, result) => {
    //         var u = await collection.findOne({id: result.value.id})
    //         delete u.token
    //         delete u.password
    //         delete u.email
    //         delete u['_id']
    //         res.send(u)
    //     })
    // })

    // app.patch('/users/:id/verified', auth, async (req, res) => {
    //     if(req.user.username != 'wing' && req.user.username != 'xarvatium') {
    //         res.status(401).send({
    //             status: 401,
    //             error: 'Unauthorized'
    //         })
    //         return
    //     }
    //     const { id } = req.params
    //     var u = await collection.findOne({id})
    //     if(!u){
    //         res.status(404).send({
    //             status: 404,
    //             error: 'User does not exist'
    //         })
    //         return
    //     }

    //     collection.findOneAndUpdate({id}, {$set: {verified: !u.verified}}, async (err, result) => {
    //         var u = await collection.findOne({id: result.value.id})
    //         delete u.token
    //         delete u.password
    //         delete u.email
    //         delete u['_id']
    //         res.send(u)
    //     })
    // })

    

    function addAuthorToPost(postArray) {
        for (let index = 0; index < postArray.length; index++) {
            var post = postArray[index];
            users.findOne({
                id: post.author
            }).then(user => {
                delete user.token
                delete user.password
                delete user.email
                delete user['_id']
                post.author = user
                delete post["_id"]
            }).then(() => {
                console.log(postArray)
            })
        }
        return postArray
    }

    app.get('/posts/all', auth, async (req, res) => {
        var allPosts = await posts.find().toArray()
        var allUsers = await users.find().toArray()
        var postlist = []
        allPosts.map(p => {
            var user = allUsers.filter(u => u.id == p.author)[0]
            p.author = user
            delete p.author.token
            delete p.author.password
            delete p.author.email
            delete p.author['_id']
            delete p["_id"]
        })
        res.send(allPosts.filter(p => p.author.suspended != true))
    })

    //Relationships

    app.post('/users/:id/followers', auth, async (req, res) => {
        const { id } = req.params

        var user = await users.findOne({id})
        if(!user){
            res.status(404).send({
                status: 404,
                error: 'User does not exist'
            })
            return
        }

        var rel = await relationships.findOne({owner: req.user.id, subject: id, type: 'follow'})
        if(rel){
            res.status(200).send({
                code: 200,
                message: 'Already following that user!'
            })
            return
        }

        relationships.insertOne({
            type: 'follow',
            subject: id,
            owner: req.user.id
        })

        res.status(200).send({
            code: 200,
            message: 'Sucesfully followed that user'
        })
    })

    app.delete('/users/:id/followers', auth, async (req, res) => {
        const { id } = req.params

        var user = await users.findOne({id})
        if(!user){
            res.status(404).send({
                status: 404,
                error: 'User does not exist'
            })
            return
        }

        var rel = await relationships.findOne({owner: req.user.id, subject: id, type: 'follow'})
        if(!rel){
            res.status(405).send({
                status: 405,
                error: 'Not following that user!'
            })
            return
        }

        relationships.deleteOne({
            type: 'follow',
            subject: id,
            owner: req.user.id
        })

        res.status(200).send({
            code: 200,
            message: 'Sucesfully unfollowed that user'
        })
    })

    app.get('/users/:id/followers', auth, async (req, res) => {
        const { id } = req.params
        var user = await users.findOne({id})
        if(!user){
            res.status(404).send({
                status: 404,
                error: 'User does not exist'
            })
            return
        }
        var rel = await relationships.find({subject: id, type: 'follow'}).toArray()
        rel = rel.map(r => {return r.owner})
        var followers = await users.find({id : {$in:rel}}, {
            projection: {
                _id: 0,
                id: 1,
                joinedTimestamp: 1,
                displayName: 1,
                username: 1,
                verified: 1,
                avatar: 1
            }
        }).toArray()
        res.status(200).send(followers)
    })

    app.get('/users/:id/following', auth, async (req, res) => {
        const { id } = req.params
        var user = await users.findOne({id})
        if(!user){
            res.status(404).send({
                status: 404,
                error: 'User does not exist'
            })
            return
        }
        var rel = await relationships.find({owner: id, type: 'follow'}).toArray()
        rel = rel.map(r => {return r.subject})
        var followers = await users.find({id : {$in:rel}}, {
            projection: {
                _id: 0,
                id: 1,
                joinedTimestamp: 1,
                displayName: 1,
                username: 1,
                verified: 1,
                avatar: 1
            }
        }).toArray()
        res.status(200).send(followers)
    })

    //Feed

    app.get('/users/@me/feed', auth, async (req, res) => {
        var rel = await relationships.find({owner: req.user.id, type: 'follow'}).toArray()
        rel = rel.map(r => {return r.subject})
        var authors = await users.find({id: {$in: rel}}, {
            projection: {
                _id: 0,
                id: 1,
                joinedTimestamp: 1,
                displayName: 1,
                username: 1,
                verified: 1,
                avatar: 1,
                flags: 1
            }
        }).toArray()
        var feed = await posts.find({author: {$in: rel}}, {projection: {
            _id: 0
        }}).toArray()

        feed = feed.map(p => {p.author = authors.filter(u => u.id == p.author)[0]; return p })
        res.send(feed)
    })

    app.get('/users/me/notifications', auth, async (req, res) => {
        var notis = await noti.find({owner: req.user.id}, {projection: {
            _id: 0,
            owner: 1,
            id: 1,
            type: 1,
            createdTimestamp: 1,
            read: 1,
            props: 1
        }}).toArray()
        var postids = notis.filter(n => n.type == 0).map(n => { return n.props.post_id })
        var postList = await posts.find({id: {$in: postids}}, {projection: {
            _id: 0,
            id: 1,
            author: 1,
            body: 1,
            createdTimestamp: 1,
            media: 1
        }}).toArray()
        var authors = postList.map(p => {return p.author})
        var authorList = await users.find({id: {$in: authors}}, {
            projection: {
                _id: 0,
                id: 1,
                joinedTimestamp: 1,
                displayName: 1,
                username: 1,
                verified: 1,
                avatar: 1,
                flags: 1
            }
        }).toArray()

        postList.map(p => {p.author = authorList.filter(a => a.id == p.author)[0]; return p})

        notis.map(n => {n.props.post = postList.filter(p => p.id == n.props.post_id)[0]; delete n.props.post_id; delete n.props.post_author_id; return n})
        res.send(notis)
    })

    app.get('/users/me/notifications/unread', auth, async (req, res) => {
        var notis = await noti.find({owner: req.user.id, read: false}).toArray()
        res.send({
            status: 200,
            count: notis.length
        })
    })

    //Notifications

    app.patch('/notifications/:id/read', auth, async (req, res) => {
        const { id }= req.params
        const not = await noti.findOne({id: id})
        if(!not) {
            res.status(404).send({
                status: 404,
                error: 'Notification not found'
            })
            return
        }
        if(not.owner != req.user.id) {
            res.status(401).send({
                status: 401,
                error: 'Unauthorized'
            })
            return
        }

        noti.findOneAndUpdate({id: id}, {$set: {read: !not.read}})
        res.send({
            status: 200,
            message: `Marked as ${!not.read == false ? 'un' : ''}read`
        })
    })

    //CDN

    app.get('/avatars/:id', async( req, res ) => {
        const {id} = req.params
        var av = await cdn.findOne({owner: id, type: 'avatar'})

        if (av) {
            var img = Buffer.from(av.data, 'base64');

            res.writeHead(200, {
                'Content-Type': 'image/' + av.format,
                'Content-Length': img.length
            });
            res.end(img);
        } else {
            res.status(404).send('Not Found')
        }
    })


    //Applications
    app.post('/users/:id/applications', auth, async ( req, res ) => {
        const { id } = req.params
        if(req.user.id != id && id != "@me"){
            res.status(401).send({
                status: 401,
                error: "Unauthorized"
            })
        }
        var ownerid = id == "@me" ? req.user.id : id
        const { admin } = req.query
        var me = constants.getFlagsFromBitfield(req.user.flags ? req.user.flags : 0)
        var appCount = await (await apps.find({owner: ownerid}).toArray()).length
        if(appCount >= 10){
            res.status(402).send({
                status: 402,
                error: "You have exceeded the maximum amount of applications"
            })
            return
        }
        const { name } = req.body
        var app = await apps.findOne({name: name})
        if(!name){
            res.status(400).send({
                status: 400,
                error: "Missing field: name"
            })
            return
        }

        if(name.length > 32){
            res.status(400).send({
                status: 400,
                error: "Name must contain fewer than 32 characters"
            })
            return
        }
        if(app){
            res.status(400).send({
                status: 400,
                error: "Name already in use"
            })
            return
        }

        var secret = await genRand("abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 22)

        var newapp = {
            id: idgen('app'),
            name,
            description: "",
            secret,
            urls: [],
            owner: ownerid,
            admin: false
        }
        if(me.admin && admin == "true"){
            newapp.admin = true
        }
        apps.insertOne(newapp)
        delete newapp["_id"]
        res.send(newapp)
    })


    //Admin

    app.patch('/admin/user/:id/admin', auth, async (req, res) => {
        var devs = ['wing', 'xarvatium']
        const { id } = req.params
        const user = id == '@me' ? req.user : await users.findOne({id: id})

        if(!user){
            res.status(401).send({
                status: 401,
                error: "Unauthorized"
            })
            return
        }

        if(devs.includes(req.user.username)){
            var flags = user.flags ? user.flags : 0
            var resolved = constants.getFlagsFromBitfield(flags)
            if(resolved.admin == true) {
                flags = flags - constants.FLAGS.ADMIN
            } else if (resolved.admin == false) {
                flags += constants.FLAGS.ADMIN
            }
            users.findOneAndUpdate({id: user.id}, {$set: {flags: flags}})
            res.send(constants.getFlagsFromBitfield(flags))
        } else {
            res.status(401).send({
                status: 401,
                error: "Unauthorized"
            })
        }
    })

    app.patch('/admin/user/:id/verified', auth, async (req, res) => {
        
        const { id } = req.params
        const user = id == '@me' ? req.user : await users.findOne({id: id})
        var me = constants.getFlagsFromBitfield(req.user.flags ? req.user.flags : 0)
        if(!user){
            res.status(401).send({
                status: 401,
                error: "Unauthorized"
            })
            return
        }

        if(me.admin == true){
            var flags = user.flags ? user.flags : 0
            var resolved = constants.getFlagsFromBitfield(flags)
            if(resolved.verified == true) {
                flags = flags - constants.FLAGS.VERIFIED
            } else if (resolved.verified == false) {
                flags += constants.FLAGS.VERIFIED
            }
            var newFlags = constants.getFlagsFromBitfield(flags)
            users.findOneAndUpdate({id: user.id}, {$set: {flags: flags, verified: newFlags.verified}})
            res.send(newFlags)
        } else {
            res.status(401).send({
                status: 401,
                error: "Unauthorized"
            })
        }
    })

    app.patch('/admin/user/:id/staff', auth, async (req, res) => {
        
        const { id } = req.params
        const user = id == '@me' ? req.user : await users.findOne({id: id})
        var me = constants.getFlagsFromBitfield(req.user.flags ? req.user.flags : 0)
        if(!user){
            res.status(401).send({
                status: 401,
                error: "Unauthorized"
            })
            return
        }

        if(me.admin == true){
            var flags = user.flags ? user.flags : 0
            var resolved = constants.getFlagsFromBitfield(flags)
            if(resolved.staff == true) {
                flags = flags - constants.FLAGS.STAFF
            } else if (resolved.staff == false) {
                flags += constants.FLAGS.STAFF
            }
            var newFlags = constants.getFlagsFromBitfield(flags)
            users.findOneAndUpdate({id: user.id}, {$set: {flags: flags}})
            res.send(newFlags)
        } else {
            res.status(401).send({
                status: 401,
                error: "Unauthorized"
            })
        }
    })

    app.patch('/admin/user/:id/suspended', auth, async (req, res) => {
        
        const { id } = req.params
        const user = await users.findOne({id: id})
        if(req.user.id == id){
            res.status(403).send({
                status: 403,
                error: "You cannot suspend yourself"
            })
            return
        }
        var me = constants.getFlagsFromBitfield(req.user.flags ? req.user.flags : 0)
        if(!user){
            res.status(401).send({
                status: 401,
                error: "Unauthorized"
            })
            return
        }

        if(me.admin == true){
            user.suspended = user.suspended ? user.suspended : false
            users.findOneAndUpdate({id: user.id}, {$set: {suspended: !user.suspended}})
            const newuser = await users.findOne({id: user.id})
            res.send(newuser)
        } else {
            res.status(401).send({
                status: 401,
                error: "Unauthorized"
            })
        }
    })


    app.post('/admin/synces', auth, async (req, res) => {
        var me = constants.getFlagsFromBitfield(req.user.flags ? req.user.flags : 0)

        if(me.admin == true){
            var all = await users.find().toArray()      
            var early = all.filter(u => u.joinedTimestamp <= 1622519999000)

            early.forEach(user => {
                var flags = user.flags ? user.flags : 0
                var resolved = constants.getFlagsFromBitfield(flags)
                if (resolved.early_supporter == false) {
                    flags += constants.FLAGS.EARLY_SUPPORTER
                }
                users.findOneAndUpdate({
                    id: user.id
                }, {
                    $set: {
                        flags: flags
                    }
                })
            })

            res.send({
                status: 200,
                message: "Flag synced"
            })
        } else {
            res.status(401).send({
                status: 401,
                error: "Unauthorized"
            })
        }
    })

    app.post('/admin/syncbio', auth, async (req, res) => {
        var me = constants.getFlagsFromBitfield(req.user.flags ? req.user.flags : 0)

        if(me.admin == true){
            var all = await users.find().toArray()      

            all.forEach(user => {
                users.findOneAndUpdate({
                    id: user.id
                }, {
                    $set: {
                        bio: "",
                        banner: ""
                    }
                })
            })

            res.send({
                status: 200,
                message: "Bio synced"
            })
        } else {
            res.status(401).send({
                status: 401,
                error: "Unauthorized"
            })
        }
    })

    app.get('/admin/apiversion', auth, async (req, res) => {
        var me = constants.getFlagsFromBitfield(req.user.flags ? req.user.flags : 0)

        if(me.admin == true){
            res.send({
                status: 200,
                message: "v1-613"
            })
        } else {
            res.status(401).send({
                status: 401,
                error: "Unauthorized"
            })
        }
    })


    if(!process.env.PROD){
        app.listen(5000, () => {
            console.log('Api running on port 5000')
        })
    } else {
        var privateKey = fs.readFileSync('key.pem', 'utf-8');
        var certificate = fs.readFileSync('cert.pem', 'utf-8');
        const credentials = {
            key: privateKey,
            cert: certificate
        }
        https.createServer(credentials, app).listen(443, (
             console.log('Api running on port 443')
        ))
        app.listen(80)
    }
});