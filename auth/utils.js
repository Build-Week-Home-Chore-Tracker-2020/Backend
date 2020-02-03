const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET || "Keep it safe";

function signToken(user) {
  const payload = {
    subject: user.id,
    name: user.name,
    role: user.role
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, jwtSecret, options);
}

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        // the token is not valid
        res.status(401).json({ you: "token not valid" });
      } else {
        req.user = { subject: decodedToken.subject, name: decodedToken.name };

        next();
      }
    });
  } else {
    res.status(401).json({ you: "invalid credentials" });
  }
};

module.exports = {
  signToken,
  authenticate
};
