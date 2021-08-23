const { query } = require("./db");
const SQL = require("@nearform/sql");

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

const getPetInfo = async () => {
  try {
    const queryResult = await query(SQL`SELECT * FROM pets`);
    return queryResult;
  } catch (error) {
    console.log(error);
  }
};
exports.getPetInfo = getPetInfo;

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

const searchResult = async (data) => {
  const {
    animalName,
    animalStatus,
    animalType,
    minWeight,
    maxWeight,
    minHeight,
    maxHeight,
  } = data;
  // if (minWeight == "%%") {
  //   console.log("minWeight = %%");
  //   const minWeightYes = `LIKE ${minWeight}`;
  //   return minWeightYes;
  // } else {
  //   const minWeightNo = `>= ${minWeight}`;
  //   return minWeightNo;
  // }
  try {
    const queryResult = await query(
      SQL`SELECT * FROM petapet.pets
      WHERE petName LIKE ${animalName}
      AND petStatus LIKE ${animalStatus}
      AND petType LIKE ${animalType}
      AND weight LIKE ${minWeight} AND weight LIKE ${maxWeight}
      AND height LIKE ${minHeight} AND height LIKE ${maxHeight}
      ;`
    );
    return queryResult;
  } catch (error) {
    console.log(error);
  }
};
exports.searchResult = searchResult;
