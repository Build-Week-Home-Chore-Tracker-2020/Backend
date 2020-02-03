const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById
};

function find() {
  return db("child").select("id", "username", "password");
}

async function add(child) {
  const [id] = await db("child").insert(child);

  return findById(id);
}

function findBy(filter) {
  return db("child").where(filter);
}

function findById(id) {
  return db("child")
    .where({ id })
    .first();
}
