const router = require("express").Router();

const Chores = require("../users/chore-model");

//all the chores
router.get("/", (req, res) => {
  res.json([
    {
      name: "Dust",
      description: "make sure all surfaces are free of dust",
      points: 100
    },
    {
      name: "Laundry",
      description: "sort, wash, dry, fold and put away laundry",
      points: 100
    },
    {
      name: "Dishes",
      description: "wash, dry and put away all dishes",
      points: 100
    }
  ]);
});

//creating a new chore is working for endpoint
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

//one childs chores
router.get("/child/:id", (req, res) => {
  res.json([
    {
      name: "Dust",
      description: "make sure all surfaces are free of dust",
      points: 100,
      completed: false,
      createdAt: "2020-02-03 20:22:14",
      updatedAt: "2020-02-03 20:22:14"
    },
    {
      name: "Laundry",
      description: "sort, wash, dry, fold and put away laundry",
      points: 100,
      completed: false,
      createdAt: "2020-02-03 20:22:14",
      updatedAt: "2020-02-03 20:22:14"
    },
    {
      name: "Dishes",
      description: "wash, dry and put away all dishes",
      points: 100,
      completed: false,
      createdAt: "2020-02-03 20:22:14",
      updatedAt: "2020-02-03 20:22:14"
    }
  ]);
});

module.exports = router;
