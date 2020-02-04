const router = require("express").Router();

const Parent = require("../users/parent-model");

//getting children of a parent is working
router.get("/children/:id", (req, res) => {
  Parent.findById(req.params.id)
    .then(parent => {
      if (!parent) {
        return res.status(404).json({
          errorMessage: "Parent by provided Id does not exist"
        });
      } else {
        Parent.getParentChildren(req.params.id)
          .then(children => {
            return res.status(200).json(children);
          })
          .catch(error => {
            console.log(error);
            return res.status(500).json({
              errorMessage: "Problem getting children from database"
            });
          });
      }
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({
        errorMessage: "Problem getting data from parent database"
      });
    });
});

//getting a parent by Id working
router.get("/:id", (req, res) => {
  Parent.findById(req.params.id)
    .then(parent => {
      if (!parent) {
        return res.status(404).json({
          errorMessage: "Parent by that Id does not exist"
        });
      } else {
        delete parent.password;
        return res.status(200).json(parent);
      }
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({
        errorMessage: "Problem getting parent from database"
      });
    });
});

//updated parent profile is working
router.put("/:id", (req, res) => {
  const { username, name, email } = req.body;
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }
  if (!name) {
    return res.status(400).json({ message: "Please provide a name" });
  }
  if (!email) {
    return res.status(400).json({ message: "Email address required" });
  }
  Parent.updateParent(req.params.id, req.body)
    .then(updated => {
      delete updated.password;
      return res.status(200).json(updated);
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({
        errorMessage: "Problem updated parent profile"
      });
    });
});

module.exports = router;
