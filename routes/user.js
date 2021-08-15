const express = require("express");
const router = express.Router();
const cors = require("cors");
const { registerUser } = require("../data/usersdb");

const api = express();
api.use(express.json());
api.use(cors());

// Register New User
router.post("/signup", async (req, res) => {
  try {
    await registerUser(req.body);
    res.send("Success - post request from router.user/signup");
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error);
  }
});

module.exports = router;
