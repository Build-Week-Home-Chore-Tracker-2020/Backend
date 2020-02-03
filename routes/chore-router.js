const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    name: "Dust",
    description: "make sure all surfaces are free of dust"
  });
});

module.exports = router;
