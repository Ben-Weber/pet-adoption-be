const jwt = require("jsonwebtoken");

const authenticate = () => {
  return (req, res, next) => {
    const secretKey = "oijfkdsfjodsf843jfe89jfd9843fj9438fj9843jf9843fj9843";
    console.log("authorization middleware ran");
    try {
      console.log("req.headers", req.headers);
      console.log("req.headers.authorization", req.headers.authorization);
      const token = req.headers.authorization.replace("Bearer ", "");

      // *Most Important Part Right Here*
      // checks if token assigned with secretKey on auth setup (sign function)
      // this is how we verify the token is sent by the server, or someone else
      const decoded = jwt.verify(token, secretKey);
      req.decoded = decoded;
      next();
    } catch (error) {
      console.log("error -", error);
      res.status(401).send({ message: "Failed to authenticate", error });
    }
  };
};
module.exports = authenticate;
