const express = require("express");
const cors = require("cors");

const api = express();
api.use(express.json());
api.use(cors());

api.use("/user", require("./routes/user.routes"));
api.use("/pets", require("./routes/pets.routes"));

api.use("/", (req, res) => {
  res.send("Welcome to Home Page");
});

const port = 4000;
api.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});

module.exports = api;
