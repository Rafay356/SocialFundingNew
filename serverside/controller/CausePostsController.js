const express = require("express");
const app = express();
const modelCausePost = require("../models/CausePostModel");
const cors = require("cors");
app.use(express.json());
// const multer = require("multer");
const fileUpload = require("express-fileupload");

app.use(fileUpload());

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type, Accept"
  );
  next();
});
app.use(cors());

//Get All User Data
const getallPosts = (req, res, next) => {
  modelCausePost.UserPost.findAll().then((User) => {
    res.status(200).json(User);
  });
};

//creating new Post
const newPost = async (req, res) => {
  //create user using model
  // if(req.files === null){
  //    return res.status(400).json({msg : 'No File Upload'})
  // }
  // const file = req.files.file;

  // file.mv(`${__dirname}/clientside/public/uploads/${file.name}`, err=>{
  //   if(err) {
  //     console.error(err)
  //     return res.status(500).send(err)
  //   }
  // })
  // console.log(req.file);
  const userReg = new modelCausePost.UserPost({
    username: req.body.username,
    avatar: req.body.avatar,
    img: req.body.img,
    category: req.body.category,
    description: req.body.description,
    goal: req.body.goal,
    raised: req.body.raised,
  });

  try {
    await userReg.save();

    res.status(200).json({
      registerPost: " Registered",
    });
  } catch (err) {
    res.status(400).json("server error", err);
  }
  //console.log("req user id",req.body.)
};

module.exports = {
  newPost,
  getallPosts,
};
