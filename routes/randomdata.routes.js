const express = require("express");

const RandomdataModel = require("../models/Randomdata.model");

const randomdataController = express.Router();

randomdataController.post("/randomdata/create", async (req, res) => {
  const { text,value } = req.body;
 
  const new_randomdata = new RandomdataModel({
   text,
   value
   
  });

  await new_randomdata.save();
  res.send(new_randomdata);
});

randomdataController.get("/getrandomdata", async (req, res) => {
  const randomdata = await RandomdataModel.find();
  if (randomdata) {
    return res.send(randomdata);
  }
});



// bmiController.patch("/userbmi/:userId", async (req, res) => {
//   const { userId } = req.params;

//   console.log(userId);

//   const update_bmi = await BmiModel.findOneAndUpdate(
//     { _id: userId },
//     req.body,
//     { new: true }
//   );

//   res.send(update_bmi);
// });



module.exports = randomdataController;
