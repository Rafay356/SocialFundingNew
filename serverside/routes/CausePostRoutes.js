const express = require("express"); //import express

// 1.
// const router = express.Router();
const router = express.Router({ mergeParams: true });

const CausePostController = require("../controller/CausePostsController");

router.get("/posts", CausePostController.getallPosts);

router.post(
  "/cause",
  CausePostController.upload.single("img"),
  CausePostController.newPost
);

module.exports = router;
