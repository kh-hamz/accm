const jwt = require("jsonwebtoken");

const JWt = "Sougma Balls";

const getId = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please use a valid token" });
  }
  try {
    const userID = jwt.verify(token, JWt);
    req.user = userID;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please use a valid token" });
  }
};
module.exports = getId;
