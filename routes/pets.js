const express = require("express");
const router = express.Router();
const cors = require("cors");
const { addPet, getPetInfo } = require("../data/petsdb");

const api = express();
api.use(cors());
api.use(express.json());

// Add New Pet
router.post("/addPet", async (req, res) => {
  try {
    await addPet(req.body);
    res.send("Success - Pet Added ");
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

// Get Pet info
router.post("/getPetInfo", async (req, res) => {
  try {
    const result = await getPetInfo();
    res.send(result);
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error);
  }
});

module.exports = router;
