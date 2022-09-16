const dbConfig = require("../dbconfig/config");
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
      type: DataTypes.STRING,
      // allowNull: false,
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
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

sequelize
  .sync({ alter: true })
  .then((data) => {
    console.log("User Table Created");
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = { Users };
