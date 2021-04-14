const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt')

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'aperii';
const client = new MongoClient(url);
// Use connect method to connect to the server
client.connect(function (err) {
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    const collection = db.collection('user');

    const express = require('express')
    const app = express()
    app.use(express.json())

    async function genToken(chars, length){
        var token = ''
        for (let i = 0; i < length; i++){
            var rn  = Math.floor(Math.random() * chars.length)
            token += chars.slice(rn, rn + 1)
        }
        var user = await collection.findOne({
            token: token
        })
        if(user){
            return genToken(chars, length)
        } else {
            return token
        }
    }
    async function genId(length){
        var id = ''
        var chars = "0123456789"
        for (let i = 0; i < length; i++){
            var rn  = Math.floor(Math.random() * chars.length)
            id += chars.slice(rn, rn + 1)
        }
        var user = await collection.findOne({
            id: id
        })
        if(user){
            return genId(length)
        } else {
            return id
        }
    }

    app.post('/auth/signup', async (req, res) => {
        const {
            email,
            displayName,
            username,
            password
        } = req.body
        
        var user = await collection.findOne({
            username: username
        })
        if (user) {res.status(400).send({status: 400,error: 'Username already taken'}); return}

        var usernameRegex = /[A-Za-z_0-9]+/g
        var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g
        if(username.length < 4 || username.length > 32) {res.status(400).send({status: 400, error: 'Username must be between 4 and 32 characters long'}); return}
        if(displayName.length < 4 || displayName.length > 64) {res.status(400).send({status: 400, error: 'Display name must be between 4 and 32 characters long'}); return}
        if(!usernameRegex.test(username)) {res.status(400).send({status: 400, error: 'Username must only contain "A-Z", "a-z", "0-9" and "_"'}); return}
        if(!passwordRegex.test(password)) {res.status(400).send({status: 400, error: 'Password must be at least 8 characters, contain at least 1 lowercase letter, 1 uppercase letter, a number, and a special character'}); return}
        var token = await genToken('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890_-', 64)
        bcrypt.hash(password, 10, async (err, hash) => {
            collection.insertOne({
                id: await genId(20),
                email: email,
                displayName: displayName,
                username: username,
                password: hash,
                token: token
            }, (err, result) => {
                res.status(200).send({username: username, token: token})
            })
        }) 
    })

    app.post('/auth/login', async (req, res) => {
        const {
            username,
            password
        } = req.body
        var user = await collection.findOne({
            username: username
        } )
        if(!user) {res.status(400).send({status: 400, error: 'No user found with that username'})}
        bcrypt.compare(password, user.password,
            function (err, result) {
                if (result == true) {
                    res.send({username: user.username, token: user.token})
                } else {
                    res.status(401).send({status: 401, error: 'Incorrect password'})
                }
            })
    })

    app.listen(5000)
});