// const express = require("express"); //import express
// // const tokenVerify = require("../verifyToken/verifyToken");
// // 1.
// //const router  = express.Router();
// const router = express.Router({ mergeParams: true });
// // 2.
// const UserController = require("../controller/UserController");
// // 3.
// router.get("/user", UserController.getallUser);
// router.post(
//   "/user/signup",
//   UserController.upload.single("profilepic"),
//   UserController.newUser
// );

// router.post("/user/login", UserController.userValidation);

// router.get("/user/:id", UserController.getUserById);

// module.exports = router;
const express = require("express");
const router = express.Router();
// const router = express.Router({ mergeParams: true });
const UserController = require("../controller/UserController"); // Correct path to controller
const tokenVerify = require("../verifyToken/verifyToken");

// Routes for User Operations
router.get("/user", UserController.getAllUsers); // Get all users
router.post(
  "/user/signup",
  UserController.upload.single("profilepic"), // Middleware for file upload
  UserController.createNewUser // Create a new user (signup)
);
router.post("/login", UserController.userValidation); // User login
router.get("/user/:id", tokenVerify, UserController.getUserById); // Get user by ID

module.exports = router;
