const query = require("./db");
// const SQL = require("@nearform/sql");

const registerUser = async (user) => {
  console.log("user from user.db", user);
  try {
    const { email, firstName, lastName, password, phone } = user;
    console.log("inside try", user);
    let sql = `INSERT INTO users (email, firstName, lastName, password, phone) VALUES ('${email}', '${firstName}', '${lastName}', '${password}', ${phone})`;
    const queryResult = await query(sql);
    console.log("queryResult", queryResult);
    return queryResult;
  } catch (error) {
    console.log(error);
  }
};
exports.registerUser = registerUser;
