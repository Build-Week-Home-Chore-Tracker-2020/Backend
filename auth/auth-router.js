Parents = require("../models/parent-model");
Child = require("../models/child-model");
const { signToken, authenticate } = require("./utils");
const router = require("express").Router();
const bcrypt = require("bcryptjs");

router.post("/register", (req, res) => {
  const { username, password, name, email } = req.body;
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
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
  Parents.add({
    username,
    password: hash,
    name,
    email,
    role: "parent"
  })
    .then(parent => {
      const token = signToken(parent);
      return res
        .status(201)
        .json({ message: `Welcome ${parent.username}!`, token, ...parent });
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({
        errorMessage: "problem with registering to the database"
      });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  if (!username) {
    return res.status(400).json({ message: "Username required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password required" });
  }
  Parents.findBy({ username })
    .first()
    .then(user => {
      if (!user) {
        return res.status(404).json({
          errorMessage: "username does not exist"
        });
      } else {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = signToken(user);
          res.status(200).json({
            message: `Welcome ${user.username}!`,
            token,
            ...user
          });
        }
      }
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({ errorMessage: "error logging in" });
    });
});

router.post("/register/:id", (req, res) => {
  const { username, password, name } = req.body;
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password required" });
  }
  if (!name) {
    return res.status(400).json({ message: "Please provide a name" });
  }
  const hash = bcrypt.hashSync(password, 10);
  Child.add({
    username,
    password: hash,
    name,
    parent_id: req.params.id,
    role: "child"
  })
    .then(child => {
      return res.status(201).json({
        message: `You succesfully created your childs account!`,
        ...child
      });
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({
        errorMessage: "problem with registering to the database"
      });
    });
});

router.post("/login/child", (req, res) => {
  let { username, password } = req.body;
  if (!username) {
    return res.status(400).json({ message: "Username required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password required" });
  }
  Child.findBy({ username })
    .first()
    .then(user => {
      if (!user) {
        return res.status(404).json({
          errorMessage: "username does not exist"
        });
      } else {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = signToken(user);
          res.status(200).json({
            message: `Welcome ${user.username}!`,
            token,
            ...user
          });
        }
      }
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({ errorMessage: "error logging in" });
    });
});

//update child profile here//

module.exports = router;
