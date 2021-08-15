const { query } = require("../mysqldb/db");
const SQL = require("@nearform/sql");
const bcrypt = require("bcrypt");
const { sign } = require("./authentication");

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

const loginUser = async (user) => {
  try {
    const { email, password } = user;
    const token = sign({ id: email });
    console.log(email, password, token);
  } catch (error) {
    console.log(error);
  }
};
exports.loginUser = loginUser;
