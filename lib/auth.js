const jwt = require("jsonwebtoken");
const secretKey = "oijfkdsfjodsf843jfe89jfd9843fj9438fj9843jf9843fj9843";
function sign(data) {
  return jwt.sign(data, secretKey, { expiresIn: 180 });
}
exports.sign = sign;
