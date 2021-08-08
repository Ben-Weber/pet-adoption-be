const express = require("express");
const api = express();
api.use(express.json());
const cors = require("cors");
api.use(cors());
const mysql = require("mysql");
const router = express.Router();

// Connection to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Huskies11",
  insecureAuth: true,
  database: "petapet",
});

// Register New User
router.post("/addNewUser", (req, res) => {
  const { email, firstName, lastName, password, phone } = req.body;
  let sql =
    "INSERT INTO users (email, firstName, lastName, password, phone) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [email, firstName, lastName, password, phone]),
    (err, result) => {
      if (err) {
        throw new Error(err);
      }
      res.send("WORKED");
    };
});

module.exports = router;
