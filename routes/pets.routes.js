const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  addPet,
  getPetInfo,
  getPetById,
  updatePetStatus,
} = require("../mysqldb/petsdb");

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
router.get("/getPetInfo", async (req, res) => {
  try {
    const result = await getPetInfo();
    res.send(result);
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error);
  }
});

// Get Pet By Id
router.get("/getPetById/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getPetById(id);
    res.send(result);
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error);
  }
});

router.post("/updatePetStatus", async (req, res) => {
  try {
    const result = await updatePetStatus(req.body);
    res.send(result);
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error);
  }
});

module.exports = router;
