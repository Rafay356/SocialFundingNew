// const dbConfig = require("../dbconfig/config");
// // const modelUser = require("./UserModel");
// const { Sequelize, DataTypes, Op } = require("sequelize");
// const { database, username, password, dialect } = dbConfig;
// const cors = require("cors");
// const express = require("express");
// const app = express();
// app.use(cors());
// const sequelize = new Sequelize(database, username, password, {
//   // dialect: dialect,
//   define: {
//     timestamps: false,
//   },
// });

// // category: ["water"],
// //     name: "Imran Khan",
// //     img: "./images/cardcover_1.jpg",
// //     avatar:
// //       "https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=",
// //     pbar: "pbar_1",
// //     progressData: "63",
// //     desc: "The various agency help the poor, you also can try.",
// //     goal: "4,5100",
// //     raised: "45,300",
// //     toGo: "45,200",

// //take three arguemnt modelname column
// const UserPost = sequelize.define(
//   "userposts",
//   {
//     id: {
//       type: Sequelize.UUID,
//       defaultValue: Sequelize.UUIDV4,
//       primaryKey: true,
//     },
//     img: {
//       type: DataTypes.STRING,
//     },
//     category: {
//       type: DataTypes.STRING,
//     },
//     title: {
//       type: DataTypes.STRING,
//     },
//     description: {
//       type: DataTypes.JSON,
//     },

//     goal: {
//       type: DataTypes.INTEGER,
//     },
//     raised: {
//       type: DataTypes.INTEGER,
//     },
//   },
//   {
//     freezeTableName: true,
//   }
// );

// sequelize
//   .sync({ force: true })
//   .then((data) => {
//     console.log("Post Table Created");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// const db = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;
// module.exports = { UserPost };
const mongoose = require("mongoose");

// Define the UserPost Schema
const UserPostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // References the User model
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: mongoose.Schema.Types.Mixed, // Can store JSON-like data
      required: true,
    },
    goal: {
      type: Number,
      required: true,
    },
    raised: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "userposts", // Collection name in MongoDB
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the UserPost model
const UserPost = mongoose.model("UserPost", UserPostSchema);

module.exports = UserPost;
