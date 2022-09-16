const express = require("express");
const app = express();
const modelUser = require("../models/UserModel");

app.use(express.json());

//Get All User Data
const getallUser = (req, res, next) => {
  modelUser.Users
    .findAll
    // attributes: { exclude: ["password"] },
    ()
    .then((User) => {
      res.status(200).json(User);
    });
};

//Get User By Id
const getUserById = (req, res, next) => {
  const id = req.params.id;
  modelUser.Users.findByPk(id).then((data) => {
    if (id <= data || id != data) {
      res.status(200).json(data);
    } else {
      res.status(404).send({ message: "Id " + id + " Not Found" });
    }
  });
};

module.exports = {
  getallUser,
  getUserById,
};
