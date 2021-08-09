const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
// const SQL = require("@nearform/sql");

const api = express();
api.use(express.json());
api.use(cors());

// Connection to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Huskies11",
  // insecureAuth: true,
  database: "petapet",
});
exports.db = db;

// Testing Connection
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected Succesfully");
});

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
