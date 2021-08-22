const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  addPet,
  getPetInfo,
  getPetById,
  updatePetStatus,
  addFavoritePet,
  removeFavoritePet,
  getUserFavoritePets,
} = require("../mysqldb/petsdb");
const authenticate = require("../middlewares/authentication");

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

// Add Favorite Pet
router.post("/addFavoritePet", async (req, res) => {
  try {
    await addFavoritePet(req.body);
    res.send("Added - Favorite Pet");
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

// Remove Favorite Pet
router.post("/removeFavoritePet", async (req, res) => {
  try {
    await removeFavoritePet(req.body);
    res.send("Removed - Favorite Pet");
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

// Get Favorite Pets
router.get(`/favoritePets`, async (req, res) => {
  const query = (user = req.query);
  try {
    const result = await getUserFavoritePets(query);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

// Update Pet Status
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
