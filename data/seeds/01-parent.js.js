const { hashSync } = require("bcryptjs");

exports.seed = function(knex) {
  // Inserts seed entries
  return knex("parent").insert([
    {
      username: "brittanymae01",
      password: hashSync("password", 8),
      name: "Brittany",
      email: "brittany@email.com",
      role: "admin"
    },
    {
      username: "steph01",
      password: hashSync("password", 8),
      name: "Stephanie",
      email: "steph@email.com",
      role: "parent"
    },
    {
      username: "emi01",
      password: hashSync("password", 8),
      name: "Emily",
      email: "emily@email.com",
      role: "parent"
    },
    {
      username: "chels01",
      password: hashSync("password", 8),
      name: "Chelsea",
      email: "chelsea@email.com",
      role: "parent"
    }
  ]);
};
