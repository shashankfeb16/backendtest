const mongoose = require("mongoose")

const randomdataSchema = new mongoose.Schema({
  text: {type:String,required:true},
  value: {type:Number,required:true}
 
})

const RandomdataModel = mongoose.model("randomdata", randomdataSchema)


module.exports = RandomdataModel