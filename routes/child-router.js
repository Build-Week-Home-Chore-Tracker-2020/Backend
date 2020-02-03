const router = require("express").Router();

router.get("/:id", (req, res) => {
  res.json({
    id: 1,
    name: "Joe",
    role: "child",
    parent_id: 1,
    current_streaks: 0,
    total_points: 0,
    highest_points: 0
  });
});

module.exports = router;
