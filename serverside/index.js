// const dbConfig = require("./dbconfig/config");
// const express = require("express");
// const app = express();
// app.use(express.json());
// const cors = require("cors");
// const causeRoute = require("./routes/CausePostRoutes");
// const userRoute = require("./routes/UserRoute");
// // const modelCausePost = require("./models/CausePost");
// // const modelCausePost = require("./models/CausePost");
// const Sequelize = require("sequelize");
// app.use(cors());

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// const bodyParser = require("body-parser");

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use("/", [causeRoute, userRoute]);

// //static Images Folder
// app.use("/images", express.static(__dirname + "/images"));
// // app.use("./images", express.static("./clientside/public/images"));
// // app.use((req, res, next) => {
// //   res.header("Access-Control-Allow-Origin", "*");
// //   next();
// // });

// const { database, username, password, dialect } = dbConfig;

// const sequelize = new Sequelize(database, username, password, {
//   dialect: dialect,
//   define: {
//     timestamps: false,
//   },
// });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection Establish");
//   })
//   .catch((err) => {
//     console.log("authenticate e", JSON.stringify(err));
//   });

// const port = process.env.PORT || 8000;
// app.listen(port, () => {
//   console.log(`Listning port ${port}`);
// });
// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
// Import routes
const causeRoute = require("./routes/CausePostRoutes");
const userRoute = require("./routes/UserRoute");

// Initialize the app

// Middleware

app.use(express.json());
const path = require("path");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use routes
app.use("/", [causeRoute, userRoute]);

// Static Images Folder
// app.use("./images", express.static("./clientside/public/images"));
// app.use("/images", express.static(__dirname + "/images"));
// Serve static files from the "public/images" directory

app.use(
  "/images",
  express.static(path.join(__dirname, "../clientside/public/images"))
);

// MongoDB Configuration
const dbConfig = require("./dbconfig/config"); // Update this file to use MongoDB settings
const { database, hostname, port } = dbConfig;

// Construct MongoDB URI
const uri = `mongodb://${hostname}:${port}/${database}`;

// Connect to MongoDB using Mongoose
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Start the server
const serverPort = process.env.PORT || 8000;
app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`);
});
