const express = require("express");
const cors = require("cors");

const port = 3300;
const api = express();

api.get("/", (req, res) => {
  res.send("Hello Get Request");
});

api.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
