const { query } = require("./db");
const SQL = require("@nearform/sql");

// add a pet to the db
const addPet = async (pet) => {
  try {
    const {
      Type,
      Name,
      Breed,
      Bio,
      Dietary,
      Height,
      Weight,
      Color,
      Adoption,
      Hypoallergenic,
      imageUrl,
    } = pet;
    const queryResult = await query(
      SQL`INSERT INTO pets (petType, petName, breed, petBio, dietary, height, weight, color, petStatus, hypoallergenic, image) VALUES (${Type},${Name},${Breed},${Bio},${Dietary},${Height},${Weight},${Color},${Adoption},${Hypoallergenic}, ${imageUrl});`
    );
    return queryResult;
  } catch (error) {
    console.log(error);
  }
};
exports.addPet = addPet;

// get pet from the db
const getPetInfo = async () => {
  try {
    const queryResult = await query(SQL`SELECT * FROM pets`);
    return queryResult;
  } catch (error) {
    console.log(error);
  }
};
exports.getPetInfo = getPetInfo;

// get pet info by id
const getPetById = async (petId) => {
  try {
    const queryResult = await query(
      SQL`SELECT * FROM pets WHERE petId = ${petId}`
    );
    return queryResult;
  } catch (error) {
    console.log(error);
  }
};
exports.getPetById = getPetById;

// Get Favorite Pets
const getUserFavoritePets = async (data) => {
  const { userId } = data;
  try {
    const queryResult = await query(SQL`SELECT * FROM pets
        INNER JOIN favoritepets
        ON pets.petId = favoritepets.petId AND favoritepets.userId = ${userId};`);
    return queryResult;
  } catch (error) {
    console.log(error);
  }
};
exports.getUserFavoritePets = getUserFavoritePets;

// Add Favorite Pet
const addFavoritePet = async (pet) => {
  console.log("pet db fav -->", pet);
  try {
    const { petId, userId } = pet;
    const queryResult = await query(
      SQL`INSERT INTO favoritepets (petId, userId) VALUES (${petId}, ${userId});`
    );
    return queryResult;
  } catch (error) {
    console.log(error);
  }
};
exports.addFavoritePet = addFavoritePet;

// Remove Favorite Pet
const removeFavoritePet = async (pet) => {
  console.log("pet db remove -->", pet);
  try {
    const { petId, userId } = pet;
    const queryResult = await query(
      SQL`DELETE FROM favoritepets WHERE petId = ${petId} AND userId=${userId};`
    );
    return queryResult;
  } catch (error) {
    console.log(error);
  }
};
exports.removeFavoritePet = removeFavoritePet;

// Update Pet Status in DB
const updatePetStatus = async (ownership) => {
  try {
    const { petId, userId, petStatus } = ownership;
    const queryResult = await query(
      SQL`UPDATE petapet.pets SET userId=${userId}, petStatus=${petStatus} WHERE petId = ${petId}`
    );
    return queryResult;
  } catch (error) {
    console.log(error);
  }
};
exports.updatePetStatus = updatePetStatus;
