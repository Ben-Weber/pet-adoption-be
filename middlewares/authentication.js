const jwt = require("jsonwebtoken");

const authenticate = () => {
  return (req, res, next) => {
    const secretKey = "oijfkdsfjodsf843jfe89jfd9843fj9438fj9843jf9843fj9843";
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.replace("Bearer ", "");
        const decoded = jwt.verify(token, secretKey);
        req.decoded = decoded;
        next();
      }
    } catch (error) {
      console.log("error -", error);
      res.status(401).send({ message: "Failed to authenticate", error });
    }
  };
};
module.exports = authenticate;
