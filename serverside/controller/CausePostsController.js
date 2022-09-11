const express = require("express");
const app = express();
const modelCausePost = require("../models/CausePostModel");
app.use(express.json());
const multer = require("multer");
const path = require("path");

//Get All User Data
const getallPosts = (req, res, next) => {
  modelCausePost.UserPost.findAll().then((User) => {
    res.status(200).json(User);
  });
};

//creating new Post
const newPost = async (req, res) => {
  //create user using model

  console.log(req.file);
  const userReg = new modelCausePost.UserPost({
    username: req.body.username,
    avatar: req.body.avatar,
    img: req.file.filename,
    category: req.body.category,
    description: req.body.description,
    goal: req.body.goal,
    raised: req.body.raised,
  });

  try {
    await userReg.save();

    res.status(200).json({
      registerPost: userReg,
    });
  } catch (err) {
    res.status(400).json("server error", err);
  }
  //console.log("req user id",req.body.)
};

// Image Controller
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../clientside/public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  // fileFilter: (req, file, cb) => {
  //   const fileTypes = /jpeg|jpg|png/;
  //   const mimeType = fileTypes.test(file.mimetype);
  //   const extname = fileTypes.test(path.extname(file.originalname));

  //   if (mimeType && extname) {
  //     return cb(null, true);
  //   }
  //   cb("Give proper file formate to Upload");
  // },
});

module.exports = {
  newPost,
  getallPosts,
  upload,
};
