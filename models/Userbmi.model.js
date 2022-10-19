const mongoose = require("mongoose")

const bmiSchema = new mongoose.Schema({
  name: {type:String,required:true},
  age:{type:Number,required:true},
  height: {type:Number,required:true},
  weight:{type:Number,required:true},
  bmi: {type:Number,required:true}
 
})

const BmiModel = mongoose.model("bmi", bmiSchema)


module.exports = BmiModel