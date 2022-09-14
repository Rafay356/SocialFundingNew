const express = require("express"); //import express

// 1.
// const router = express.Router();
const router = express.Router({ mergeParams: true });

const CausePostController = require("../controller/CausePostsController");

router.get("/posts", CausePostController.getallPosts);

router.get("/posts/singlepost/:id", CausePostController.getuserId);

router.post(
  "/cause",
  CausePostController.upload.fields([
    { name: "img", maxCount: 1 },
    { name: "avatar", maxCount: 1 },
  ]),
  CausePostController.newPost
);

router.put(
  "/cause/:id",
  CausePostController.upload.fields([
    { name: "img", maxCount: 1 },
    { name: "avatar", maxCount: 1 },
  ]),
  CausePostController.postUpdate
);

router.delete("/cause/:id", CausePostController.Delete);

module.exports = router;
