const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
  name: {type:String,required:true},
  age:{type:Number,required:true},
  gender:{type:String,required:true},
  test:{type:String,required:true},
})

const StudentModel = mongoose.model("student", studentSchema)


module.exports = StudentModel