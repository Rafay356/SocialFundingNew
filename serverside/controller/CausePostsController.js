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

//Get User By Id
const getuserId = (req, res, next) => {
  const id = req.params.id;
  modelCausePost.UserPost.findByPk(id).then((data) => {
    if (id <= data || id != data) {
      res.status(200).json(data);
    } else {
      res.status(404).send({ message: "Id " + id + " Not Found" });
    }
  });
};

//creating new Post
const newPost = async (req, res) => {
  //create user using model
  const userReg = new modelCausePost.UserPost({
    username: req.body.username,
    title: req.body.title,
    avatar: req.files.avatar[0].filename,
    img: req.files.img[0].filename,
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

// Update a note identified by the noteId in the request
// const postUpdate = async (req, res) => {
//   try {
//     const post = await modelCausePost.UserPost.findById(req.params.id);

//     try {
//       const updatedPost = await modelCausePost.UserPost.findByIdAndUpdate(
//         req.params.id,
//         {
//           username: req.body.username,
//           title: req.body.title,
//           // avatar: req.files.avatar[0].filename,
//           // img: req.files.img[0].filename,
//           category: req.body.category,
//           description: req.body.description,
//           goal: req.body.goal,
//           raised: req.body.raised,
//         },
//         { new: true }
//       );
//       res.status(200).json(updatedPost);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

//updating the User
const postUpdate = async (req, res) => {
  const un = {
    username: req.body.username,
    title: req.body.title,
    avatar: req.files.avatar[0].filename,
    img: req.files.img[0].filename,
    category: req.body.category,
    description: req.body.description,
    goal: req.body.goal,
    raised: req.body.raised,
  };
  const id = req.params.id;

  const updateUser = await modelCausePost.UserPost.update(un, {
    where: { id: id },
  });
  if (updateUser) {
    return res.status(200).json({
      id: id,
      User_Updated: un,
    });
  } else {
    res.status(400).json({
      meg: "Not Found",
    });
  }
  // console.log(updateUser);
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

const Delete = async (req, res) => {
  console.log(req.params.id);
  const del = await modelCausePost.UserPost.findOne({
    where: { id: req.params.id },
  });
  if (!del) return res.status(404).send("Not Found");
  else {
    await del.destroy();
    res.status(200).send("Deleted");
  }
};

module.exports = {
  newPost,
  getallPosts,
  upload,
  getuserId,
  Delete,
  postUpdate,
};
