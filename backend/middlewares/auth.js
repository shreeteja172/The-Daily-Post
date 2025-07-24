const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authheader = req.headers.authorization;
  if (!authheader || !authheader.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "Invalid token Authorisation",
    });
  }
  const token = authheader.split(" ")[1];
  // console.log("token", token)

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log("decoded", decoded);
    // console.log("decoded.userId:", decoded.userId);
    // console.log("decoded.id:", decoded.id);
    req.userid = decoded.userId || decoded.id;
    next();
  } catch (error) {
    // console.log("JWT verification error:", error);
    return res.status(403).json({
      message: "Invalid Error",
    });
  }
};

module.exports = {
  authMiddleware,
};
