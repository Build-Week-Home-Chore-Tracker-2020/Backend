Users = require("../users/users-model");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const bcrypt = require("bcryptjs");

router.post("/register", (req, res) => {
  const { username, password, name, email } = req.body;
  if (!username) {
    return res.status(400).json({ message: "Email address required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password required" });
  }
  if (!name) {
    return res.status(400).json({ message: "Please provide a name" });
  }
  if (!email) {
    return res.status(400).json({ message: "Email address required" });
  }
  const hash = bcrypt.hashSync(password, 10);
  Users.add({
    username,
    password: hash,
    name,
    email
  })
    .then(parent => {
      res.status(201).json(parent);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "problem with registering to the database"
      });
    });
});

module.exports = router;
