const { query } = require("../data/db");
const SQL = require("@nearform/sql");

const registerUser = async (user) => {
  try {
    const { email, firstName, lastName, password, phone } = user;
    console.log("'req.body' from routes/user.js", user);
    const queryResult = await query(
      SQL`INSERT INTO users (email, firstName, lastName, password, phone) VALUES (${email}, ${firstName}, ${lastName}, ${password}, ${phone});`
    );
    return queryResult;
  } catch (error) {
    console.log(error);
  }
};
exports.registerUser = registerUser;
