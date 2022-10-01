const express = require("express");
const cors = require("cors")
const connection = require("./config/db");
const teacherController = require("./routes/teacher.routes")
const studentController = require("./routes/students.routes")
const authentication = require("./middlewares/authentication")

const app = express();
require('dotenv').config()
app.use(express.json())
app.use(cors())



app.get("/", (req, res) => {
    res.send("Home page")
})

app.use("/teacher", teacherController);

app.use(authentication)

app.use(studentController)

app.listen(process.env.PORT, async () => {
    try{
        await connection
        console.log("Db connnected")
    }
    catch(err){
        console.log("error connecting to db")
        console.log(err)
    }
    console.log("listening on 8000")
})
