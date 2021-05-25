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
    const collection = db.collection('user');
    const posts = db.collection('posts');
    const cdn = db.collection('cdn');
    const relationships = db.collection('relationships')

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

        collection.findOne({
            token: tok
        }).then(u => {
            if (!u) {
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
        

        collection.findOne({
            token: tok
        }).then(u => {
            if(u) req.user = u
            
            next()
        })
    }

    app.use(express.json({limit: 1000000}))
    app.use(cors(corsOpts))
    app.use(cookieparser())

    async function genToken(chars, length) {
        var token = ''
        for (let i = 0; i < length; i++) {
            var rn = Math.floor(Math.random() * chars.length)
            token += chars.slice(rn, rn + 1)
        }
        var user = await collection.findOne({
            token: token
        })
        if (user) {
            return genToken(chars, length)
        } else {
            return token
        }
    }
    async function genId(length) {
        var id = ''
        var chars = "0123456789"
        for (let i = 0; i < length; i++) {
            var rn = Math.floor(Math.random() * chars.length)
            id += chars.slice(rn, rn + 1)
        }
        var user = await collection.findOne({
            id: id
        })
        if (user) {
            return genId(length)
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

            var user = await collection.findOne({
                username: username.toLowerCase()
            })
            if (user) {
                res.status(400).send({
                    status: 400,
                    error: 'Username already taken'
                });
                return
            }

            var user = await collection.findOne({
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
            var userid = await genId(20)
            var token = await sign({id: userid}, process.env.ACCESS_TOKEN_SECRET)
            bcrypt.hash(password, 10, async (err, hash) => {
                collection.insertOne({
                    id: userid,
                    joinedTimestamp: Date.now(),
                    email: email,
                    displayName: displayName,
                    username: username.toLowerCase(),
                    password: hash,
                    verifiedEmail: false,
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
        var user = await collection.findOne({
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
        var user = await collection.findOne({
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
        var u = await collection.findOne({id : id})
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
        var u = await collection.findOne({username : username})
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
            
            u.posts = allPosts
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
            
            u.posts = allPosts
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
        var postID = await genId(20)
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
        const { avatar, verified, displayname, username } = req.body
        const { id } = req.params

        if(req.user.id != id) {
            res.status(401).send({
                status: 401,
                error: 'Unauthorized'
            })
            return
        }

        if(avatar){
            var datauriRegex = /^data:image\/(jpeg|jpg|png|gif);base64,[\d\D]+$/g
            if(!datauriRegex.test(avatar)){
                res.status(400).send({
                    status: 400,
                    error: 'Avatar needs to be a valid data uri scheme, only allowing jpeg, png, and gif formats'
                })
                return
            }
            var formats = ['jpeg', 'jpg', 'png', 'gif']
            var format = avatar.split(':')[1].split(';')[0].split('/')[1].toLowerCase()
            if(!formats.includes(format)){
                res.status(400).send({
                    status: 400,
                    error: 'Avatar needs to be a valid data uri scheme, only allowing jpeg, png, and gif formats'
                })
                return
            }
            var av = await cdn.findOne({type: 'avatar', owner: id})
            if(av){
                cdn.findOneAndUpdate({type: 'avatar', owner: id}, {$set:{data: avatar.split('base64,')[1], format }})
                collection.findOneAndUpdate({id}, {$set:{avatar: `https://aperii.com/api/usercontent/avatars/${id}`}})
                var u = await collection.findOne({id})
                delete u.token
                delete u.password
                delete u.email
                delete u["_id"]
                res.send(u)
            } else {
                cdn.insertOne({
                    type: 'avatar',
                    owner: id,
                    data: avatar.split('base64,')[1],
                    format
                })
                collection.findOneAndUpdate({id}, {$set:{avatar: `https://aperii.com/api/usercontent/avatars/${id}`}})
                var u = await collection.findOne({id})
                delete u.token
                delete u.password
                delete u.email
                delete u["_id"]
                res.send(u)
            }
        }
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
            collection.findOne({
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
        var allUsers = await collection.find().toArray()
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
        res.send(allPosts)
    })

    //Relationships

    app.post('/users/:id/followers', auth, async (req, res) => {
        const { id } = req.params

        var user = await collection.findOne({id})
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

        var user = await collection.findOne({id})
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
        var user = await collection.findOne({id})
        if(!user){
            res.status(404).send({
                status: 404,
                error: 'User does not exist'
            })
            return
        }
        var rel = await relationships.find({subject: id, type: 'follow'}).toArray()
        rel = rel.map(r => {return r.owner})
        var followers = await collection.find({id : {$in:rel}}, {
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
        var user = await collection.findOne({id})
        if(!user){
            res.status(404).send({
                status: 404,
                error: 'User does not exist'
            })
            return
        }
        var rel = await relationships.find({owner: id, type: 'follow'}).toArray()
        rel = rel.map(r => {return r.subject})
        var followers = await collection.find({id : {$in:rel}}, {
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

    app.get('/users/me/feed', auth, async (req, res) => {
        var rel = await relationships.find({owner: req.user.id, type: 'follow'}).toArray()
        rel = rel.map(r => {return r.subject})
        var authors = await collection.find({id: {$in: rel}}, {
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
        var feed = await posts.find({author: {$in: rel}}, {projection: {
            _id: 0
        }}).toArray()

        feed = feed.map(p => {p.author = authors.filter(u => u.id == p.author)[0]; return p })
        res.send(feed)
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


    //Admin

    app.patch('/admin/user/:id/admin', auth, async (req, res) => {
        var devs = ['wing', 'xarvatium']
        const { id } = req.params
        const user = id == '@me' ? req.user : await collection.findOne({id: id})

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
            collection.findOneAndUpdate({id: user.id}, {$set: {flags: flags}})
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
        const user = id == '@me' ? req.user : await collection.findOne({id: id})
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
            collection.findOneAndUpdate({id: user.id}, {$set: {flags: flags, verified: newFlags.verified}})
            res.send(newFlags)
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
            var all = await collection.find().toArray()      
            var early = all.filter(u => u.joinedTimestamp <= 1622519999000)

            early.forEach(user => {
                var flags = user.flags ? user.flags : 0
                var resolved = constants.getFlagsFromBitfield(flags)
                if (resolved.early_supporter == true) {
                    flags = flags - constants.FLAGS.EARLY_SUPPORTER
                } else if (resolved.early_supporter == false) {
                    flags += constants.FLAGS.EARLY_SUPPORTER
                }
                collection.findOneAndUpdate({
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