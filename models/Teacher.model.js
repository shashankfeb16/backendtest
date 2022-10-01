const mongoose = require("mongoose")

const teacherSchema = new mongoose.Schema({
    email : {type : String},
    password : {type : String},
    // userId:{type:String}
})

const TeacherModel = mongoose.model("teacher", teacherSchema)


module.exports = TeacherModel