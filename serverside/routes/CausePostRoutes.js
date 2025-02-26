// const express = require("express"); //import express
// const tokenVerify = require("../verifyToken/verifyToken");
// // 1.
// // const router = express.Router();
// const router = express.Router({ mergeParams: true });

// const CausePostController = require("../controller/CausePostsController");

// //mockdata api
// router.get("/examplecauses", CausePostController.getallMockData);

// router.get("/posts", CausePostController.getallPosts);

// router.get("/posts/singlepost/:id", tokenVerify, CausePostController.getPostId);

// router.post(
//   "/cause",
//   CausePostController.upload.single("img"),
//   CausePostController.newPost
// );

// router.put(
//   "/cause/:id",
//   tokenVerify,
//   CausePostController.upload.single([
//     { name: "img", maxCount: 1 },
//     { name: "profilepic", maxCount: 1 },
//   ]),
//   CausePostController.postUpdate
// );

// router.delete("/cause/:id", tokenVerify, CausePostController.Delete);

// module.exports = router;

const express = require("express");
const tokenVerify = require("../verifyToken/verifyToken");
const CausePostController = require("../controller/CausePostsController");
const router = express.Router({ mergeParams: true });

// Route to fetch mock data
// router.get("/examplecauses", CausePostController.getallMockData);

// Route to fetch all posts
router.get("/posts", CausePostController.getAllPosts);

// Route to fetch a single post by ID with authentication
router.get(
  "/posts/singlepost/:_id",
  tokenVerify,
  CausePostController.getPostById
);

// Route to create a new cause post
router.post(
  "/cause",
  tokenVerify,
  CausePostController.upload.single("img"),
  CausePostController.createPost
);

// Route to search for posts
router.get("/search", CausePostController.searchPost);

// Route to update an existing cause post by ID with authentication
router.put(
  "/cause/:_id",
  tokenVerify,
  CausePostController.upload.fields([
    { name: "img", maxCount: 1 },
    { name: "profilepic", maxCount: 1 },
  ]),
  CausePostController.updatePost
);

// Route to delete a cause post by ID with authentication
router.delete("/cause/:_id", tokenVerify, CausePostController.deletePost);

module.exports = router;
