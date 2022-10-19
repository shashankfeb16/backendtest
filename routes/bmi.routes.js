const express = require("express");

const BmiModel = require("../models/Userbmi.model");

const bmiController = express.Router();

bmiController.post("/bmi/create", async (req, res) => {
  const { name, age, height, weight } = req.body;
  let bmi = weight/(height*height);
  bmi = bmi.toFixed();
  const new_bmi = new BmiModel({
    name,
    age,
    height,
    weight,
    bmi
   
  });

  await new_bmi.save();
  res.send(new_bmi);
});

bmiController.get("/getallbmi", async (req, res) => {
  const bmi = await BmiModel.find();
  if (bmi) {
    return res.send(bmi);
  }
});



bmiController.patch("/userbmi/:userId", async (req, res) => {
  const { userId } = req.params;

  console.log(userId);

  const update_bmi = await BmiModel.findOneAndUpdate(
    { _id: userId },
    req.body,
    { new: true }
  );

  res.send(update_bmi);
});



module.exports = bmiController;
