const express = require("express");
const cors = require("cors")
const connection = require("./config/db");
const userController = require("./routes/user.routes")
const blogController = require("./routes/blogs.routes")
const authentication = require("./middlewares/authentication")

const app = express();
require('dotenv').config()
app.use(express.json())
app.use(cors())



app.get("/", (req, res) => {
    res.send("Blog page")
})

app.use("/user", userController);

app.use(authentication)

app.use(blogController)

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
