// const authorizeRole = (roles) => (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//         return res.status(403).json({ message: "Forbidden: You don't have access" });
//     }
//     next();
// };

// module.exports = { authorizeRole };


const authorizeRole = (allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.user.role; // From decoded JWT
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ error: "Insufficient permissions" });
      }
      next();
    };
  };
  
  module.exports = { authorizeRole };