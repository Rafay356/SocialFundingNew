const express = require("express"); //import express
const tokenVerify = require("../verifyToken/verifyToken");
// 1.
//const router  = express.Router();
const router = express.Router({ mergeParams: true });
// 2.
const UserController = require("../controller/UserController");
// 3.
router.get("/user", UserController.getallUser);
router.post(
  "/user/signup",
  UserController.upload.single("profilepic"),
  UserController.newUser
);

router.post("/user/login", UserController.userValidation);

router.get("/user/:id", UserController.getUserById);

module.exports = router;
