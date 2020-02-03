exports.seed = function(knex) {
  // Inserts seed entries
  return knex("child_details").insert([
    {
      child_id: 1,
      chore_id: 4
    },
    {
      child_id: 1,
      chore_id: 2
    },
    {
      child_id: 2,
      chore_id: 3
    },
    {
      child_id: 2,
      chore_id: 1
    },
    {
      child_id: 3,
      chore_id: 4
    },
    {
      child_id: 3,
      chore_id: 2
    }
  ]);
};
