const express = require('express')
const router = express.Router()
const User = require("../models/userModel")
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = "@SecretKey1"
const saltRounds = 5

router.get("/", (req, res) => {
    res.send("Get all users")
})

router.post("/", async (req, res) => {
    let data = req.body
    await User.create(data)
    console.log(data)
    res.send("User created successfully")
})

router.post("/login", (req, res) => {
    let data = req.body
    let email = data.email
    let password = data.password
    User.findOne({ email: email }).exec()
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password,  function(err, result) {
                console.log(result)
                if(result){
                    var token = jwt.sign({ email: email }, secretKey); 
                    res.json({token: token})
                }
            })
        }
        else{
            res.status(400).send({message: "invalid credentials"})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(400).send("Login failed")
    })
})

router.post("/register",(req, res) => {
    let data = req.body
    console.log(data)
    bcrypt.hash(data.password, saltRounds, function(err, hash) {
        if(hash){
            let user = new User(data)
            user.password = hash
            user.save()
            .then(user => {
                res.json(user)
            })
            .catch(err => {
                res.status(400).json(err)
            })
        }else{
            res.status(400).json({"message": "Sometging went wrong"})
        }
    });
})

module.exports = router