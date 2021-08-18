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
    } = pet;
    const queryResult = await query(
      SQL`INSERT INTO pets (petType, petName, breed, petBio, dietary, height, weight, color, petStatus, hypoallergenic) VALUES (${Type},${Name},${Breed},${Bio},${Dietary},${Height},${Weight},${Color},${Adoption},${Hypoallergenic});`
    );
    return queryResult;
  } catch (error) {
    console.log(error);
  }
};
exports.addPet = addPet;

// get pet info
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
