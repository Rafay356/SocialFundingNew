const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();

app.use(express.json());

module.exports = function (req, res, next) {
  // const authHeader = req.headers.authorization; //name that will used in postman header
  //   if (!token) return res.status(401).send("Access Denied");
  const authHeader =
    req.body.token || req.query.token || req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    // if (!token) return res.status(401).send("Access Denied");
    // verify decoded and returns the decoded value
    //decode only decod the value not return the values
    jwt.verify(token, "secret key", (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }
      req.user = user;
      console.log("user", user);
      next();
    });
  } else {
    res.status(400).json("You are not Authenticated");
  }
};
