exports.seed = function(knex) {
  return knex("chores").insert([
    { name: "Dusting", description: "make sure all surfaces are free of dust" },
    { name: "Dishes", description: "wash, dry and put away all dishes" },
    {
      name: "Laundry",
      description: "sort, wash, dry, fold and put away laundry"
    },
    {
      name: "Mow the lawn",
      description: "cut the grass and clean up stray cuttings"
    }
  ]);
};
