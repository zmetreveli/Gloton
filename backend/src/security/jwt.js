const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const jwtMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: "Unauthorized MISSING HEADER" });

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, jwtSecret, (error, payload) => {
      if (error) {
        return res.status(403).json({ message: "Invalid token" });
      } else {
        req.jwtPayload = payload;
        next();
      }
    });
  } else {
    Response.status(401).json({ message: "Token not provided" });
  }
};

module.exports = {
  jwtMiddleware,
};
