const router = require("express").Router();

const Chores = require("../models/chore-model");
const Child = require("../models/child-model");

//get a specific chore by id
router.get("/chore/:choreId", (req, res) => {
  if (!req.params.choreId) {
    return res.status(404).json({
      errorMessage: "No chore by that Id was found"
    });
  }
  Chores.findById(req.params.choreId)
    .then(chore => {
      return res.status(200).json(chore);
    })
    .catch(error => {
      console.log(error);
      return res
        .status(500)
        .json({ errorMessage: "Problem getting chore from database" });
    });
});

//getting all common chores is working
router.get("/comChores", (req, res) => {
  Chores.findByParentId(1)
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

//this endpoint gets the chores just for that familly
//needs some validation
router.get("/:parentId", (req, res) => {
  Chores.findByParentId(req.params.parentId)
    .then(chores => {
      return res.status(200).json(chores);
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({
        errorMessage: "Problem finding chores from database"
      });
    });
});

//this endpoint combines all the common chores and the chores made for that family
//needs some validation
router.get("/comChores/:parentId", (req, res) => {
  Chores.findByParentId(req.params.parentId)
    .then(chores => {
      Chores.findByParentId(1).then(common => {
        const all = [...common, ...chores];
        return res.status(200).json(all);
      });
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({
        errorMessage: "Could not retreive chores from database"
      });
    });
});

//adds a chore to a family
router.post("/:parentId", (req, res) => {
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
  Chores.add({ ...req.body, parent_id: req.params.parentId })
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

//this combines child info and their chores
router.get("/combined/:id", (req, res) => {
  Child.findById(req.params.id)
    .then(child => {
      if (!child) {
        return res.status(404).json({
          errorMessage: "Child by that Id does not exist"
        });
      } else {
        Child.getChildChores(req.params.id).then(chores => {
          delete child.password;
          return res.status(200).json({ child, chores });
        });
      }
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({
        errorMessage: "Problem getting parent from database"
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
//wondering if this still works?
router.delete("/child/:id/:choreId", (req, res) => {
  if (!req.params.id) {
    return res.status(404).json({
      errorMessage: "Id of that child does not exist"
    });
  }
  Chores.removeChoreFromChild(req.params.choreId)
    .then(chore => {
      if (!chore) {
        return res.status(404).json({
          errorMessage: "Id for that childs chore does not exist"
        });
      } else {
        return res.status(200).json({ message: "success" });
      }
    })
    .catch(error => {
      console.log(error);
      return res
        .status(500)
        .json({ errorMessage: "problem deleting chore from child" });
    });
});

//updates a family chore
router.put("/chore/:choreId", (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ errorMessage: "Chore needs a name" });
  }
  if (!description) {
    return res.status(400).json({ errorMessage: "Chore needs a description" });
  }
  Chores.updateChore(req.params.choreId, req.body)
    .then(updated => {
      return res.status(200).json(updated);
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({ errorMessage: "Problem updateding chore" });
    });
});

//deletes a family chore
router.delete("/chore/:choreId", (req, res) => {
  if (!choreId) {
    return res.status(404).json({
      errorMessage: "Chore with that Id does not exist"
    });
  }
  Chores.removeChorefromList(req.params.choreId)
    .then(deleted => {
      return res
        .status(200)
        .json({ message: "Chore was successfully deleted" });
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({ errorMessage: "Problem deleting chore" });
    });
});

module.exports = router;
