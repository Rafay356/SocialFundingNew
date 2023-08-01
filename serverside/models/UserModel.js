const dbConfig = require("../dbconfig/config");
const modelCausePost = require("./CausePostModel");
const { Sequelize, DataTypes, Op } = require("sequelize");
const { database, username, password, dialect } = dbConfig;
const express = require("express");
const app = express();
const sequelize = new Sequelize(database, username, password, {
  dialect: dialect,
  define: {
    timestamps: false,
  },
});

//take three arguemnt modelname column
const Users = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    username: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    email: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    profilepic: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

//Association with the post model
//Relationship is one to many
//Source is user and target is post
//user hasmany post
//each post belongs to one user
Users.hasMany(modelCausePost.UserPost, {
  foreignKey: { name: "userId", type: DataTypes.UUID },
});
modelCausePost.UserPost.belongsTo(Users);

// sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log("User table is Created");
//     // return mdoelLink();
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = { Users };
