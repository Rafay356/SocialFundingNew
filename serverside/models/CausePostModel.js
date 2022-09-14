const dbConfig = require("../dbconfig/config");
const { Sequelize, DataTypes, Op } = require("sequelize");
const { database, username, password, dialect } = dbConfig;
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
const sequelize = new Sequelize(database, username, password, {
  dialect: dialect,
  define: {
    timestamps: false,
  },
});

// category: ["water"],
//     name: "Imran Khan",
//     img: "./images/cardcover_1.jpg",
//     avatar:
//       "https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=",
//     pbar: "pbar_1",
//     progressData: "63",
//     desc: "The various agency help the poor, you also can try.",
//     goal: "4,5100",
//     raised: "45,300",
//     toGo: "45,200",

//take three arguemnt modelname column
const UserPost = sequelize.define(
  "userposts",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.JSON,
    },

    goal: {
      type: DataTypes.INTEGER,
    },
    raised: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);
sequelize
  .sync({ alter: true })
  .then((data) => {
    console.log("dataBase Table is Created ");
  })
  .catch((err) => {
    console.log(err);
  });
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection Establish");
  })
  .catch((err) => {
    console.log("authenticate e", JSON.stringify(err));
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = { UserPost };
