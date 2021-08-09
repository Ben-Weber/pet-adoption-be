const express = require("express");
const api = express();
api.use(express.json());
const cors = require("cors");
api.use(cors());
const router = express.Router();
const { query } = require("../data/db");
const { registerUser } = require("../data/usersdb");

// Register New User
router.post("/addNewUser", async (req, res) => {
  try {
    // const { email, firstName, lastName, password, phone } = req.body;
    // console.log(req.body);
    // let sql = `INSERT INTO users (email, firstName, lastName, password, phone) VALUES ('${email}', '${firstName}', '${lastName}', '${password}', ${phone})`;

    registerUser(req.body.user);
    res.send(req.body.user);
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error);
  }
});

module.exports = router;
