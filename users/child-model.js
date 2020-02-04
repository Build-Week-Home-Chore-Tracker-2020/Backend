const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  getChildChores,
  updateChild
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

//this needs to update the points as well i think??
function updateChild(updated) {}

function getChildChores(id) {
  return db("child_details")
    .select(
      "chores.name",
      "chores.description",
      "chores.points",
      "child_details.id",
      "child_details.completed",
      "child_details.createdAt",
      "child_details.updatedAt"
    )
    .join("chores", "chores.id", "child_details.chore_id")
    .where("child_details.child_id", id);
}
