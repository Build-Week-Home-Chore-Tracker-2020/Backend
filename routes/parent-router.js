const router = require("express").Router();

//kids of a parent
router.get("/children/:id", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Joe",
      role: "child",
      parent_id: 1,
      current_streaks: 0,
      total_points: 0,
      highest_points: 0
    },
    {
      id: 2,
      name: "Mary",
      role: "child",
      parent_id: 1,
      current_streaks: 0,
      total_points: 0,
      highest_points: 0
    },
    {
      id: 3,
      name: "Bob",
      role: "child",
      parent_id: 1,
      current_streaks: 0,
      total_points: 0,
      highest_points: 0
    }
  ]);
});

//parent info
router.get("/:id", (req, res) => {
  res.json({
    id: 1,
    name: "Karen",
    username: "karen01",
    role: "parent",
    email: "karen@gmail.com"
  });
});

module.exports = router;
