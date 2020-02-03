const { hashSync } = require("bcryptjs");

exports.seed = function(knex) {
  // Inserts seed entries
  return knex("child").insert([
    {
      username: "darc01",
      password: hashSync("password", 8),
      name: "Darcie",
      parent_id: 3,
      role: "child"
    },
    {
      username: "carl01",
      password: hashSync("password", 8),
      name: "Carlin",
      parent_id: 2,
      role: "child"
    },
    {
      username: "cars01",
      password: hashSync("password", 8),
      name: "Carson",
      parent_id: 1,
      role: "child"
    }
  ]);
};
