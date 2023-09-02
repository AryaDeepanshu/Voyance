const jwt = require("jsonwebtoken");

/* Method to Generate Access Token */
module.exports.generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, host: user.host }, process.env.JWT_SECRET);
};

/* if user is Logged-in -> assign payload to response object */
module.exports.verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("You are not authenticated!");

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) return res.status(403).json("Token is not valid!");
    req.payload = payload;
    next();
  });
};
