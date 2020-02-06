const router = require("express").Router();

const Child = require("../models/child-model");

//get a child by Id
router.get("/:id", (req, res) => {
  Child.findById(req.params.id)
    .then(child => {
      if (!child) {
        return res
          .status(404)
          .json({ errorMessage: "No child by that Id exists" });
      } else {
        delete child.password;
        res.status(200).json(child);
      }
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({
        errorMessage: "problem gettting child from database"
      });
    });
});

//update a childs informations
router.put("/:id", (req, res) => {
  const { username, name } = req.body;
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }
  if (!name) {
    return res.status(400).json({ message: "Please provide a name" });
  }
  Child.updateChild(req.params.id, req.body)
    .then(updated => {
      delete updated.password;
      return res.status(200).json(updated);
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({
        errorMessage: "Problem updated child profile"
      });
    });
});

module.exports = router;
