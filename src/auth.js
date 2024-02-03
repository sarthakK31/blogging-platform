// src/middleware/auth.js
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
};

// const hasAuthorization = (req, res, next) => {
//   // Check if the user has the necessary authorization
//   // For simplicity, we'll assume a 'isAdmin' field in the user object
//   if (req.user && req.user.isAdmin) {
//     return next();
//   }
//   res.status(403).json({ error: 'Forbidden' });
// };

export default isAuthenticated;
