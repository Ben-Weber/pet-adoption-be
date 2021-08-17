const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  registerUser,
  getUserByEmail,
  loginUser_clgOnly,
  getLastUser,
} = require("../mysqldb/usersdb");
const bcrypt = require("bcrypt");
const authenticate = require("../middlewares/authentication");
const { sign } = require("../lib/auth");
const {
  validationMid,
  usersSchemaLogin,
  usersSchemaSignUp,
} = require("../middlewares/validation.js");

const api = express();
api.use(express.json());
api.use(cors());

router.post("/signup", validationMid(usersSchemaSignUp), async (req, res) => {
  try {
    await registerUser(req.body);
    res.send("Success - post request from router.user/signup");
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

router.post("/login", validationMid(usersSchemaLogin), async (req, res) => {
  try {
    // checks if user in db
    let user = null;
    user = await getUserByEmail(req.body.email);
    console.log("{user:42} req.body.email-", req.body.email);
    if (!user) {
      res.status(401).send("we didn't find this user");
      return;
    }

    // compare hashed password
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      res.status(401).send("incorrect password");
      return;
    }

    // continues login process
    await loginUser_clgOnly(req.body);

    // assign token
    const token = sign({ id: user.userId });

    res.send(token);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

router.get("/new", authenticate(), (req, res) => {
  res.send("success");
});

module.exports = router;
