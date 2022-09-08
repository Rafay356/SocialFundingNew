const dbConfig = require("./dbconfig/config");
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const causeRoute = require("./routes/CausePostRoutes");
// const modelCausePost = require("./models/CausePost");
// const modelCausePost = require("./models/CausePost");
const Sequelize = require("sequelize");
app.use(cors());
app.use("/", causeRoute);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

const { database, username, password, dialect } = dbConfig;

const sequelize = new Sequelize(database, username, password, {
  dialect: dialect,
  define: {
    timestamps: false,
  },
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection Establish");
  })
  .catch((err) => {
    console.log("authenticate e", JSON.stringify(err));
  });

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listning port ${port}`);
});
