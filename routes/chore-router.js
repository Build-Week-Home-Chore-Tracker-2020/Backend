const router = require("express").Router();

const Chores = require("../users/chore-model");
const Child = require("../users/child-model");

//getting all chores is working
router.get("/", (req, res) => {
  Chores.find()
    .then(chores => {
      return res.status(200).json(chores);
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({
        errorMessage: "problem retreiving chores"
      });
    });
});

//creating a new chore is working
router.post("/", (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({
      message: "Please provide a name"
    });
  }
  if (!description) {
    return res.status(400).json({
      message: "Please provide a description"
    });
  }
  Chores.add(req.body)
    .then(chore => {
      return res.status(201).json(chore);
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({
        errorMessage: "problem creating chore"
      });
    });
});

//getting a childs chores working
router.get("/child/:id", (req, res) => {
  Child.getChildChores(req.params.id)
    .then(chores => {
      if (!chores) {
        return res
          .status(404)
          .json({ errorMessage: "Child with that Id does not exist" });
      } else {
        return res.status(200).json(chores);
      }
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({
        errorMessage: "Problem getting chores from database"
      });
    });
});

//add a chore to a child working
router.post("/child/:id", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      errorMessage: "please provide a name for this chore"
    });
  }

  Child.findById(req.params.id).then(child => {
    if (!child) {
      return res.status(404).json({
        errorMessage: "Could not find child id"
      });
    } else {
      Chores.findBy({ name }).then(chore => {
        if (!chore) {
          return res
            .status(404)
            .json({ errorMessage: "could not find chore by this name" });
        }
        Chores.addChoretoChild({
          child_id: req.params.id,
          chore_id: chore.id
        })
          .then(newChore => {
            return res
              .status(201)
              .json({ successMessage: "successfully added chore to child!" });
          })
          .catch(error => {
            console.log(error);
            return res.status(500).json({
              errorMessage: "problem adding chore to child"
            });
          });
      });
    }
  });
});

//deleting chore from child works, may want to add child id to endpoint??? or just have it as /:id?
router.delete("/child/:id/", (req, res) => {
  Chores.removeChoreFromChild(req.params.id).then(() => {
    return res.status(200).json({ message: "success" });
  });
});

// router.put();

module.exports = router;
