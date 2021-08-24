const { query } = require("../mysqldb/db");
const SQL = require("@nearform/sql");
const bcrypt = require("bcrypt");

const registerUser = async (user) => {
  try {
    const { email, firstName, lastName, password, phone } = user;
    const hashPassword = await bcrypt.hash(password, 8);
    const queryResult = await query(
      SQL`INSERT INTO users (email, firstName, lastName, password, phone) VALUES (${email}, ${firstName}, ${lastName}, ${hashPassword}, ${phone});`
    );
    return queryResult;
  } catch (error) {
    console.log(error);
  }
};
exports.registerUser = registerUser;

const getUserByEmail = async (email) => {
  try {
    const queryResult = await query(
      SQL`SELECT * FROM users WHERE email = ${email}`
    );
    return queryResult[0];
  } catch (error) {
    console.log(error);
  }
};
exports.getUserByEmail = getUserByEmail;

const getLastUser = async () => {
  const queryResult = await query(
    SQL`SELECT * from users ORDER BY id DESC LIMIT 1;`
  );
  console.log("queryResult[0] -", queryResult[0]);
  return queryResult[0];
};
exports.getLastUser = getLastUser;

const loginUser = async (user) => {
  try {
    const { password } = user;
    await bcrypt.hash(password, 8);
    return;
  } catch (error) {
    console.log(error);
  }
};
exports.loginUser = loginUser;

const getAllUsers = async () => {
  try {
    const queryResult = await query(SQL`SELECT * FROM users;`);
    return queryResult;
  } catch (error) {
    console.log(error);
  }
};
exports.getAllUsers = getAllUsers;
