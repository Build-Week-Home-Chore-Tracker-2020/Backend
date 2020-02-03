const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById
};

function find() {
  return db("parent").select("id", "username", "password");
}

async function add(parent) {
  const [id] = await db("parent").insert(parent);

  return findById(id);
}

function findBy(filter) {
  return db("parent").where(filter);
}

function findById(id) {
  return db("parent")
    .where({ id })
    .first();
}
