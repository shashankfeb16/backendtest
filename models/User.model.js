const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email : {type : String},
    password : {type : String},
    userId:{type:String}
})

const UserModel = mongoose.model("newuser", userSchema)


module.exports = UserModel