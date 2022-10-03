const express = require("express");

const StudentModel = require("../models/Student.model")

const studentController = express.Router();

studentController.post("/student/create",async(req,res)=>{
    const {name,age,gender,test} = req.body;
    const new_student = new StudentModel({
       name,
       age,
       gender,
       test
    });

    await new_student.save();
    res.send(new_student);

});

studentController.get("/getallstudents",async(req,res)=>{
    const student = await StudentModel.find();
    if(student){
        res.send(student)
    }
});

studentController.get("/students/filter",async(req,res)=>{
    const {gender} = req.query;
    const student = await StudentModel.find({gender});
    res.send(student);
})

studentController.get("/students",async(req,res)=>{
    let {gender,sort,page} = req.query;
    console.log(gender,sort,page);
    if(gender===undefined && sort===undefined){
        const student = await StudentModel.find();
        if(student){
           return res.send(student)
        }
    }
    if(gender===undefined){
        const student = await StudentModel.find().sort({age:sort}).skip(page).limit(3);
        if(student){
            return res.send(student);
        }
    }
    if(sort===undefined){
        const student = await StudentModel.find({gender}).skip(page).limit(3);
        if(student){
           return res.send(student);
        }
    }
    if(page===undefined){
        const student = await StudentModel.find();
        if(student){
           return res.send(student);
        }
    }
    const student = await StudentModel.find({gender}).sort({age:sort}).skip(page).limit(3);
    if(student){
       return res.send(student);
    }
   
});

studentController.get("/students/search",async(req,res)=>{
    const {name} = req.query;
    const student = await StudentModel.find({name});
    res.send(student)
})



studentController.get("/students/sort",async(req,res)=>{
    let {sort} = req.query;
    const student = await StudentModel.find().sort({age:sort})
    res.send(student)
   
});



studentController.patch("/students/:studentId",async (req,res)=>{
    const {studentId} = req.params;
   
    console.log(studentId)

    const update_stu = await StudentModel.findOneAndUpdate({_id: studentId},req.body,{new:true});

    res.send(update_stu)
});

studentController.delete("/delete/:studentId",async(req,res)=>{
    const {studentId} = req.params;
    
    await StudentModel.findOneAndDelete({_id:studentId});
    res.send("Student Deleted")
    

})

module.exports = studentController;