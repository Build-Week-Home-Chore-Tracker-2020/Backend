exports.seed = function(knex) {
  return knex("chores").insert([
    {
      name: "Dusting",
      description: "make sure all surfaces are free of dust",
      parent_id: 1
    },
    {
      name: "Dishes",
      description: "wash, dry and put away all dishes",
      parent_id: 1
    },
    {
      name: "Laundry",
      description: "sort, wash, dry, fold and put away laundry",
      parent_id: 1
    },
    {
      name: "Mow the lawn",
      description: "cut the grass and clean up stray cuttings",
      parent_id: 1
    }
  ]);
};
