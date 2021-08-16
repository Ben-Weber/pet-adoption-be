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

router.post(
  "/login",
  // authenticate(),
  validationMid(usersSchemaLogin),
  async (req, res) => {
    try {
      // checks if user in db
      let user = null;
      user = await getUserByEmail(req.body.email);
      console.log("req.body.email-", req.body.email);
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
      res.send(
        `"Login Success" userId: "${user.userId}" email: ${req.body.email} --> passwordHashed: ${user.password} 
        & token: ${token}
        `
      );
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }
);

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
