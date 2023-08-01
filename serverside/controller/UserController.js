const express = require("express");
const app = express();
const modelUser = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");

app.use(express.json());

//Get All User Data
const getallUser = (req, res, next) => {
  modelUser.Users.findAll({ attributes: { exclude: ["password"] } }).then(
    (User) => {
      res.status(200).json(User);
    }
  );
};

//Get User By Id
const getUserById = (req, res, next) => {
  const id = req.params.id;

  modelUser.Users.findByPk(id).then((data) => {
    console.log(data);
    if (id <= data || id != data) {
      res.status(200).json(data);
    } else {
      res.status(404).send({ message: "Id " + id + " Not Found" });
    }
  });
};

//Creating new user and generating hash password
const newUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  //store hash bcrypt.hash
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //new User
  //create user using model
  const userReg = new modelUser.Users({
    password: hashPassword,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    profilepic: req.file.filename,
  });
  const token = jwt.sign(
    { id: userReg.id, email: userReg.email },
    "secret key",
    {
      expiresIn: "2h",
    }
  );
  userReg.token = token;
  try {
    await userReg.save();

    res.status(200).json({
      savedUser: " Registered",
      user: userReg,
    });
  } catch (emailExist) {
    res.status(404).json({
      emailExist: emailExist.message,
    });
  }
  //console.log("req user id",req.body.)
};

//comparing the hash password  with the plain password to get the valid result
const userValidation = async (req, res, next) => {
  const user = await modelUser.Users.findOne({
    where: { email: req.body.email },
    // attributes: { exclude: ["password"] },
  });

  if (!user) return res.status(404).send("Email Not Found");

  //comparing

  const validPass = await bcrypt.compare(req.body.password, user.password);
  // console.log("user password", user.password, "re body", req.body.password);
  if (!validPass) return res.status(401).send("Email or Password is incorrect");

  if (validPass) {
    //assigning the sign and password to the valid user who have token or secret key
    const token = jwt.sign({ id: user.id, email: user.email }, "secret key", {
      expiresIn: "2h",
    });

    user.token = token;
    return res.status(200).header("auth_token", token).json({
      message: "Login Success",
      email: user.email,
      user: user,
    });
    // res.header("auth_user", token).send(token)
  }

  // res.header("auth_user", token).send(token)
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
  getallUser,
  getUserById,
  newUser,
  upload,
  userValidation,
};
