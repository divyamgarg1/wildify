// const jwt = require("jsonwebtoken");

// const authenticateUser = (req, res, next) => {
//     const token = req.header("Authorization");
//     if (!token) return res.status(401).json({ message: "Access Denied" });

//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = verified;
//         next();
//     } catch (err) {
//         res.status(400).json({ message: "Invalid Token" });
//     }
// };

// module.exports = { authenticateUser };
// backend/middleware/authMiddleware.js
// backend/middleware/authMiddleware.js
// backend/middleware/authMiddleware.js
// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
};

const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied. Insufficient permissions." });
    }
    next();
  };
};

module.exports = { authenticateToken, authorizeRole };