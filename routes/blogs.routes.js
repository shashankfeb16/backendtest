const express = require("express");

const BlogModel = require("../models/Blogs.model")

const blogController = express.Router();

blogController.post("/blogs/create",async(req,res)=>{
    const {title,category,author,content,userId} = req.body;
    const new_blog = new BlogModel({
        title,
        category,
        author,
        content,
        userId
    });

    await new_blog.save();
    res.send(new_blog)

});

blogController.get("/blogs",async(req,res)=>{
    // const {userId} = req.body;
    const {title,author,category} = req.query
    // console.log(title,author)
    const blog = await BlogModel.find({title,author,category});
    // const blog = await BlogModel.find({$or:[{$and:[{title,author}]},{$and:[{title,category}]},{$and:[{author,category}]},{$and:[{title,author,category}]}]});
    // const blog = await BlogModel.find({$or:[{title,author},{title,category},{author,category},{title,author,category}]})
    res.send(blog);
   
});

blogController.get("/blogs/title",async(req,res)=>{
    // const {userId} = req.body;
    let {title,sort,page} = req.query;
    // sort = sort.toLowerCase()
    console.log(sort)
    const blog = await BlogModel.find({title}).sort({author:sort}).skip(page).limit(8)
    res.send(blog);
   
});

blogController.patch("/blogs/:blogId",async (req,res)=>{
    const {blogId} = req.params;
    const {userId} = req.body;
   
    const blog = await BlogModel.findOne({_id:blogId});
    console.log(blogId)

    if(blogId==userId){
     const new_blog = await BlogModel.findOneAndUpdate({_id: blogId},req.body,{new:true});
     return res.send({"message": "Successfully updated", new_blog});

    }
    else{
        return res.send("you are not authorized");
    }
});

blogController.delete("/delete/:blogId",async(req,res)=>{
    const {blogId} = req.params;
    const {userId} = req.body;
    const blog= await BlogModel.findOne({_id:blogId});

    if(blog.userId==userId){
      await BlogModel.findOneAndDelete({_id: blogId});
     return res.send({"message": "Successfully deleted"});

    }
    else{
        return res.send("you are not authorized");
    }

})

module.exports = blogController;