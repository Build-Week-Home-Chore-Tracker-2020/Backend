const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById
};

function find() {
  return db("chores").select("id", "username", "password");
}

async function add(chore) {
  const [id] = await db("chores").insert(chore);

  return findById(id);
}

function findBy(filter) {
  return db("chores").where(filter);
}

function findById(id) {
  return db("chores")
    .where({ id })
    .first();
}

function addChoretoChild(chore) {
  return db("child_details")
    .insert(chore)
    .then(ids => {
      return ids;
    })
    .catch(error => {
      console.log(error);
    });
}
