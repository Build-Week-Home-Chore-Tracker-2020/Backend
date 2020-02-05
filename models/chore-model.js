const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  addChoretoChild,
  removeChoreFromChild,
  findByParentId,
  updateChore,
  removeChorefromList
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

function findByParentId(parent_id) {
  return db("chores").where({ parent_id });
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

function removeChoreFromChild(id) {
  return db("child_details")
    .where({ id })
    .del();
}

function updateChore(id, updated) {
  return db("chores")
    .where({ id })
    .update(updated)
    .then(() => {
      return findById(id);
    });
}

function removeChorefromList(id) {
  return db("chores")
    .where({ id })
    .del();
}
