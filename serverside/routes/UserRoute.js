const express = require("express"); //import express
// 1.
//const router  = express.Router();
const router = express.Router({ mergeParams: true });
// 2.
const UserController = require("../controller/UserController");
// 3.
router.get("/user", UserController.getallUser);

router.get("/user/:id", UserController.getUserById);

module.exports = router;
