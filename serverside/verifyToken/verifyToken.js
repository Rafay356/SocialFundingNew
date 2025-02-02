const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();

app.use(express.json());

module.exports = function (req, res, next) {
  // const authHeader = req.headers.authorization; //name that will used in postman header
  //   if (!token) return res.status(401).send("Access Denied");
  const authHeader =
    req.body.token || req.query.token || req.headers.authorization;
  // console.log(authHeader, "headertoken");
  if (!authHeader) {
    return res.status(401).json("No authentication token provided");
  }

  if (authHeader) {
    // const token = authHeader.split(" ")[1];
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json("Invalid token format");
    }
    // console.log("Token:", token);
    // const decoded = jwt.decode(token);
    // console.log("Decoded Token:", decoded);
    // if (!token) return res.status(401).send("Access Denied");
    // verify decoded and returns the decoded value
    //decode only decod the value not return the values
    jwt.verify(token, "secret key", (err, user) => {
      if (err) {
        console.error("Token verification error:", err);
        return res.status(403).json({
          message: "Token is not valid",
          error: err.message,
        });
      }
      req._id = user._id;
      // console.log("user", user);
      next();
    });
  } else {
    res.status(400).json("You are not Authenticated");
  }
};
