const router = require("express").Router();

const Child = require("../users/child-model");

//get child by ID working
router.get("/:id", (req, res) => {
  Child.findById(req.params.id)
    .then(child => {
      if (!child) {
        return res
          .status(400)
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

// router.put("/:id", (req, res) => {});

// router.delete("/:id", (req, res) => {});

module.exports = router;
