const express = require("express");
const api = express();
api.use(express.json());
const cors = require("cors");
api.use(cors());
const router = express.Router();
const { registerUser } = require("../data/usersdb");

// Register New User
router.post("/signup", async (req, res) => {
  try {
    registerUser(req.body);
    res.send("Success - post request from router.user/signup");
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error);
  }
});

module.exports = router;
