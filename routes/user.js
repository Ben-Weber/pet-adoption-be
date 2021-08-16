const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  registerUser,
  getUserByEmail,
  loginUser,
} = require("../mysqldb/usersdb");
const auth = require("../mysqldb/authentication");

const api = express();
api.use(express.json());
api.use(cors());

router.post("/signup", async (req, res) => {
  try {
    await registerUser(req.body);
    res.send("Success - post request from router.user/signup");
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = null;
    // checks if user in db
    user = await getUserByEmail(req.body.email);
    if (!user) {
      res.status(401).send("we didn't find this user");
    }
    // gives token
    await loginUser(req.body);
    res.send(`"Login Success" ${req.body.email} --> ${req.body.password}`);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

// user Authentication
// router.post("/login", async (req, res) => {
//   const user = await getUserByEmailAndPassword(
//     req.body.email,
//     req.body.password
//   );
//   if (!user) {
//     res.sendStatus(401).send({ error: "Bad email or password" });
//     return;
//   }
//   const token = auth.sign({ id: user.id });
//   res.send({ user: { name: user.name, email: user.email }, token });
// });

module.exports = router;
