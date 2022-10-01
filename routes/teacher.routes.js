const express = require("express")
const bcrypt  = require('bcrypt');
var jwt = require('jsonwebtoken');

const TeacherModel = require("../models/Teacher.model")

const teacherController = express.Router();

teacherController.post("/signup", (req, res) => {
    const {email, password} = req.body;
    bcrypt.hash(password, 6, async function(err, hash) {
        if(err){
            res.send("please try again")
        }
        const user = new TeacherModel({
            email,
            password : hash
        })
        await user.save();
        res.send("Sign up is successfull")
    });
})

teacherController.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await TeacherModel.findOne({email})
    console.log(user)
    if(!user){
        return res.send("Invalid Credentials")
    }
    const hash = user.password;
    bcrypt.compare(password, hash, function(err, result) {
        if(result){
            var token = jwt.sign({email}, 'secret');
            return res.send({"message":"login success", "token" : token})
        }
        else{
            return res.send("Invalid credentials")
        }
    });
})


module.exports = teacherController