require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const api = express();
api.use(express.json());
api.use(cors());

// Connection to MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  // insecureAuth: true,
  database: process.env.DB_NAME,
});
exports.db = db;

// Query BoilerPlate
const query = (queryText) => {
  return new Promise((resolve, reject) => {
    db.query(queryText, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
exports.query = query;

// Testing Connection
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected Succesfully");
});
