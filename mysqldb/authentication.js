// lib/authentication.js
const jwt = require("jsonwebtoken");
const password = "a_very_secret_password_to_store_secretly";
function sign(data) {
  return jwt.sign(data, password);
}
exports.sign = sign;