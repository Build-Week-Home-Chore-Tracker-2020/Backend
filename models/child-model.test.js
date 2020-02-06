const Child = require("./child-model");
const Chore = require("./chore-model");
const db = require("../data/dbConfig");

describe("child-model", function() {
  beforeEach(async () => {
    await db("child").truncate();
  });
  beforeEach(async () => {
    await db("chores").truncate();
  });
  beforeEach(async () => {
    await db("child_details").truncate();
  });
  describe("add", function() {
    it("adds a child to the database", async function() {
      await Child.add({
        username: "testing",
        name: "testing",
        password: "testing",
        parent_id: 2
      });
      const child = await db("child");
      expect(child).toHaveLength(1);
    });
  });

  describe("findBy", function() {
    it("finds a child by username", async function() {
      const newChild = await Child.add({
        username: "testing",
        name: "testing",
        password: "testing",
        parent_id: 2
      });
      const child = await Child.findBy({ username: newChild.username });
      expect(child).toHaveLength(1);
    });
  });

  describe("findById", function() {
    it("finds a child by id", async function() {
      const newChild = await Child.add({
        username: "testing",
        name: "testing",
        password: "testing",
        parent_id: 2
      });
      const child = await Child.findById(newChild.id);
      expect(child.name).toBe("testing");
    });
  });

  describe("updateChild", function() {
    it("updates a child information", async function() {
      const newChild = await Child.add({
        username: "testing",
        name: "testing",
        password: "testing",
        parent_id: 2
      });

      const childChanges = {
        name: "testing01"
      };
      const updatedChild = await Child.updateChild(newChild.id, childChanges);
      expect(updatedChild.name).toBe("testing01");
    });
  });

  describe("getChildChores", function() {
    it("gets a childs chores", async function() {
      const newChild = await Child.add({
        username: "testing",
        name: "testing",
        password: "testing",
        parent_id: 2
      });

      const add = await Chore.add({
        name: "testChore",
        description: "test description",
        parent_id: 1
      });

      const addChore = await Chore.addChoretoChild({
        child_id: 1,
        chore_id: 1
      });

      const chores = await Child.getChildChores(newChild.id);
      expect(chores).toHaveLength(1);
    });
  });
});
