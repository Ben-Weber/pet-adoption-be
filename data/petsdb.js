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

// get pet info from the database
const getPetInfo = async () => {
  try {
    const queryResult = await query(
      SQL`SELECT * FROM petapet.pets WHERE petId=1`
    );
    return queryResult;
  } catch (error) {
    console.log(error);
  }
};
exports.getPetInfo = getPetInfo;
