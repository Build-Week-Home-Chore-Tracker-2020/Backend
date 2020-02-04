const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  addChoretoChild,
  removeChoreFromChild
};

function find() {
  return db("chores");
}

async function add(chore) {
  const [id] = await db("chores").insert(chore);

  return findById(id);
}

function findBy(filter) {
  return db("chores")
    .where(filter)
    .first();
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

function removeChoreFromChild(chore) {
  return db(child_details).del(chore);
}
