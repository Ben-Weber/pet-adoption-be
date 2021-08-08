const express = require("express");
const api = express();
api.use(express.json());
const cors = require("cors");
api.use(cors());
const mysql = require("mysql");

api.use("/user", require("./routes/user"));

api.use("/", (req, res) => {
  res.send("Welcome to Home Page");
});

// Connection to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Huskies11",
  insecureAuth: true,
  database: "petapet",
});

// connect MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected Succesfully");
});

const port = 3300;
api.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
