const express = require("express"); //import express
const tokenVerify = require("../verifyToken/verifyToken");
// 1.
// const router = express.Router();
const router = express.Router({ mergeParams: true });

const CausePostController = require("../controller/CausePostsController");

//mockdata api
router.get("/examplecauses", CausePostController.getallMockData);

router.get("/posts", CausePostController.getallPosts);

router.get("/posts/singlepost/:id", tokenVerify, CausePostController.getPostId);

router.post(
  "/cause",
  CausePostController.upload.single("img"),
  CausePostController.newPost
);

router.put(
  "/cause/:id",
  tokenVerify,
  CausePostController.upload.single([
    { name: "img", maxCount: 1 },
    { name: "profilepic", maxCount: 1 },
  ]),
  CausePostController.postUpdate
);

router.delete("/cause/:id", tokenVerify, CausePostController.Delete);

module.exports = router;
