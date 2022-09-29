const express = require("express")
const bcrypt  = require('bcrypt');
var jwt = require('jsonwebtoken');

const UserModel = require("../models/User.model")

const userController = express.Router();

userController.post("/signup", (req, res) => {
    const {email, password} = req.body;
    bcrypt.hash(password, 6, async function(err, hash) {
        if(err){
            res.send("please try again")
        }
        const user = new UserModel({
            email,
            password : hash
        })
        await user.save();
        res.send("Sign up is successfull")
    });
})

userController.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email})
    console.log(user)
    if(!user){
        return res.send("Invalid Credentials")
    }
    const hash = user.password;
    const userId = user._id;
    bcrypt.compare(password, hash, function(err, result) {
        if(result){
            var token = jwt.sign({email,userId}, 'secret');
            return res.send({"message":"login success", "token" : token})
        }
        else{
            return res.send("Invalid credentials")
        }
    });
})


module.exports = userController