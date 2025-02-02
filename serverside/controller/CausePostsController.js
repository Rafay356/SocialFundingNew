// const express = require("express");
// const app = express();
// const modelCausePost = require("../models/CausePostModel");
// const modelUser = require("../models/UserModel");
// app.use(express.json());
// const multer = require("multer");
// const path = require("path");
// // const mockData = require("../mockData/mockdata");

// // //Mock Data controller
// // const getallMockData = (req, res, next) => {
// //   res.status(200).json(mockData);
// // };

// //Get All User Data
// const getallPosts = (req, res, next) => {
//   modelCausePost.UserPost.findAll({
//     include: [
//       {
//         model: modelUser.Users,
//         attributes: [
//           "firstname",
//           "lastname",
//           "username",
//           "email",
//           "profilepic",
//           "password",
//         ],
//       },
//     ],
//   }).then((User) => {
//     res.status(200).json(User);
//   });
// };

// //Get User By Id
// // const getuserId = (req, res, next) => {
// //   const id = req.params.id;
// //   modelCausePost.UserPost.findByPk(id).then((data) => {
// //     console.log(data);
// //     data.findAll({
// //       include: [
// //         {
// //           model: data,
// //           attributes: [
// //             "firstname",
// //             "lastname",
// //             "username",
// //             "email",
// //             "profilepic",
// //             "password",
// //           ],
// //         },
// //       ],
// //     });
// //     if (id <= data || id != data) {
// //       res.status(200).json(data);
// //     } else {
// //       res.status(404).send({ message: "Id " + id + " Not Found" });
// //     }
// //   });
// // };

// const getPostId = async (req, res, next) => {
//   const id = req.params.id;
//   return await modelCausePost.UserPost.findByPk(id, {
//     include: [
//       {
//         model: modelUser.Users,
//         attributes: [
//           "firstname",
//           "lastname",
//           "username",
//           "email",
//           "profilepic",
//           "password",
//         ],
//       },
//     ],
//   })
//     .then((data) => {
//       if (id) return res.status(200).json(data);
//     })
//     .catch((err) => {
//       res.send(err);
//     });
//   // .then((data) => {
//   //   // console.log(data[0].dataValues.id);
//   //   // if (data[0].dataValues.id) return res.status(200).json(data);

//   //   // return res
//   //   //   .status(404)
//   //   //   .send({ message: "Id " + data[0].dataValues.id + " Not Found" });
//   // });
// };

// //creating new Post
// const newPost = async (req, res) => {
//   const user = await modelUser.Users.findOne({
//     where: { username: req.body.username },
//   });
//   if (!user) return res.status(404).send("user not found");

//   //create user using model
//   const userReg = new modelCausePost.UserPost({
//     userId: user.id,
//     title: req.body.title,
//     // avatar: req.files.avatar[0].filename,
//     img: req.file.filename,
//     category: req.body.category,
//     description: req.body.description,
//     goal: req.body.goal,
//     raised: req.body.raised,
//   });

//   try {
//     await userReg.save();

//     res.status(200).json({
//       registerPost: userReg,
//     });
//   } catch (err) {
//     res.status(400).json("server error", err);
//   }
//   //console.log("req user id",req.body.)
// };

// // Update a note identified by the noteId in the request
// // const postUpdate = async (req, res) => {
// //   try {
// //     const post = await modelCausePost.UserPost.findById(req.params.id);

// //     try {
// //       const updatedPost = await modelCausePost.UserPost.findByIdAndUpdate(
// //         req.params.id,
// //         {
// //           username: req.body.username,
// //           title: req.body.title,
// //           // avatar: req.files.avatar[0].filename,
// //           // img: req.files.img[0].filename,
// //           category: req.body.category,
// //           description: req.body.description,
// //           goal: req.body.goal,
// //           raised: req.body.raised,
// //         },
// //         { new: true }
// //       );
// //       res.status(200).json(updatedPost);
// //     } catch (err) {
// //       res.status(500).json(err);
// //     }
// //   } catch (err) {
// //     res.status(500).json(err);
// //   }
// // };

// //updating the User
// const postUpdate = async (req, res) => {
//   const un = {
//     title: req.body.title,
//     img: req.files.img[0].filename,
//     profilepic: req.files.profilepic[0].filename,
//     category: req.body.category,
//     description: req.body.description,
//     goal: req.body.goal,
//     raised: req.body.raised,
//   };
//   const id = req.params.id;

//   const updateUser = await modelCausePost.UserPost.update(un, {
//     where: { id: id },
//   });
//   // console.log(updateUser.userId);
//   await modelUser.Users.update(
//     { firstname: req.body.firstname },
//     {
//       where: { id: id },
//     }
//   );

//   if (updateUser) {
//     return res.status(200).json({
//       id: id,
//       User_Updated: un,
//     });
//   } else {
//     res.status(400).json({
//       meg: "Not Found",
//     });
//   }
//   console.log(updateUser);
// };

// // Image Controller
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../clientside/public/images");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: storage,
//   // fileFilter: (req, file, cb) => {
//   //   const fileTypes = /jpeg|jpg|png/;
//   //   const mimeType = fileTypes.test(file.mimetype);
//   //   const extname = fileTypes.test(path.extname(file.originalname));

//   //   if (mimeType && extname) {
//   //     return cb(null, true);
//   //   }
//   //   cb("Give proper file formate to Upload");
//   // },
// });

// const Delete = async (req, res) => {
//   const del = await modelCausePost.UserPost.findOne({
//     where: { id: req.params.id },
//   });
//   if (!del) return res.status(404).send("User Not Found");
//   else {
//     await del.destroy();
//     res.status(200).send("User has been deleted");
//   }
// };

// module.exports = {
//   newPost,
//   getallPosts,
//   upload,
//   getPostId,
//   Delete,
//   postUpdate,
//   getallMockData,
// };

const multer = require("multer");
const path = require("path");
const UserPost = require("../models/CausePostModel"); // Mongoose CausePost model
const User = require("../models/UserModel"); // Mongoose User model

// Get All Posts with User Information

const getAllPosts = async (req, res) => {
  try {
    const posts = await UserPost.find({}).populate("userId", [
      "firstname",
      "lastname",
      "username",
      "email",
      "profilepic",
    ]);
    if (!posts.length) {
      return res.status(404).json({ message: "No posts found" });
    }

    // console.log("Posts fetched successfully:", posts);
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to fetch posts", error });
  }
};

// const getAllPosts = async (req, res) => {
//   try {
//     const posts = await UserPost.UserPost.findAll({
//       include: [
//         {
//           model: User.Users,
//           attributes: [
//             "firstname",
//             "lastname",
//             "username",
//             "email",
//             "profilepic",
//             "password",
//           ],
//         },
//       ],
//     });
//     res.status(200).json(posts);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching posts", error });
//   }
// };

// Get Post By ID
const getPostById = async (req, res) => {
  // const id = req.params._id;
  // console.log(id, "id");
  try {
    const post = await UserPost.findById(req.params._id).populate("userId", [
      "firstname",
      "lastname",
      "username",
      "email",
      "profilepic",
    ]);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error });
  }
};

// Create New Post
const createPost = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return res.status(404).json({ message: "User not found" });

    const newPost = new UserPost({
      userId: user._id,

      title: req.body.title,
      username: req.body.username,
      img: req.file.filename,
      category: req.body.category,
      description: req.body.description,
      goal: req.body.goal,
      raised: req.body.raised,
    });

    const savedPost = await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: savedPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Error creating post", error });
  }
};

// Update Post

const updatePost = async (req, res) => {
  try {
    const updatedPost = await UserPost.findByIdAndUpdate(
      req.params._id,
      {
        title: req.body.title,
        firstname: req.body.firstname,
        profilepic: req.files.profilepic[0].filename,
        img: req.files.img[0].filename,
        category: req.body.category,
        description: req.body.description,
        goal: req.body.goal,
        raised: req.body.raised,
      },
      { new: true }
    );
    // console.log("Updating post with data:", updatedPost);

    if (!updatedPost)
      return res.status(404).json({ message: "Post not found" });

    res
      .status(200)
      .json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating post", error: error.message });
  }
};

// Delete Post
const deletePost = async (req, res) => {
  try {
    const deletedPost = await UserPost.findByIdAndDelete(req.params._id);
    if (!deletedPost)
      return res.status(404).json({ message: "Post not found" });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error });
  }
};

// Multer Image Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../clientside/public/images");
  },
  filename: (req, file, cb) => {
    // cb(null, file.originalname);
    const cleanFileName = file.originalname
      .replace(/[\s()]/g, "") // Remove spaces and parentheses
      .replace(/[^a-zA-Z0-9_.-]/g, ""); // Remove any other invalid characters

    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}-${cleanFileName}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|PNG|JPG/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper file formate to Upload");
  },
});

const searchPost = async (req, res) => {
  try {
    const { title } = req.query; // Extract title from query params

    if (!title) {
      return res
        .status(400)
        .json({ message: "Title query parameter is required" });
    }

    const posts = await UserPost.find({
      title: { $regex: title, $options: "i" }, // Case-insensitive search
    }).populate("userId", [
      "firstname",
      "lastname",
      "username",
      "email",
      "profilepic",
    ]);

    if (!posts.length) {
      return res.status(404).json({ message: "No posts found" });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error searching posts:", error);
    res.status(500).json({ message: "Error searching posts", error });
  }
};

// Export Controllers
module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  upload,
  searchPost,
};
