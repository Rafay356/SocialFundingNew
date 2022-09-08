const express = require("express"); //import express
var cors = require("cors");
var app = express();
app.use(cors());
const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
// });

//passing configuration which tells the destination in which folder img is saved.
// const upload = multer({ storage: storage });

// 1.
// const router = express.Router();
const router = express.Router({ mergeParams: true });

const CausePostController = require("../controller/CausePostsController");

router.get("/posts", CausePostController.getallPosts);

router.post("/cause", CausePostController.newPost);

module.exports = router;
