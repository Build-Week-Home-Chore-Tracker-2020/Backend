const Chore = require("./chore-model");
const Child = require("./child-model");
const db = require("../data/dbConfig");

describe("chore-model", function() {
  beforeEach(async () => {
    await db("chores").truncate();
  });
  beforeEach(async () => {
    await db("child").truncate();
  });
  beforeEach(async () => {
    await db("child_details").truncate();
  });

  describe("add", function() {
    it("adds a chore to the family chores", async function() {
      const newChore = await Chore.add({
        name: "testChore",
        description: "chore description",
        parent_id: 1
      });
      expect(newChore.name).toBe("testChore");
    });
  });

  describe("findBy", function() {
    it("finds a chore by name", async function() {
      const newChore = await Chore.add({
        name: "testChore",
        description: "chore description",
        parent_id: 1
      });
      const found = await Chore.findBy({ name: newChore.name });
      expect(found.name).toBe("testChore");
    });
  });

  describe("findByParentId", function() {
    it("finds chores only with parent Id attached to it", async function() {
      const newChore = await Chore.add({
        name: "testChore",
        description: "chore description",
        parent_id: 1
      });

      const chore = await Chore.findByParentId(newChore.parent_id);
      expect(chore).toHaveLength(1);
    });
  });

  describe("addChoretoChild", function() {
    it("adds a chore to a child", async function() {
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
      expect(addChore).toHaveLength(1);
    });
  });
  describe("removeChoreFromChild", function() {
    it("removes a chore to a child", async function() {
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
      const deleted = await Chore.removeChoreFromChild(1);
      expect(deleted.length).toBeFalsy();
    });
  });

  describe("updateChore", function() {
    it("updates a chore ", async function() {
      const newChore = await Chore.add({
        name: "testChore",
        description: "test description",
        parent_id: 1
      });

      const choreChanges = {
        name: "testing01"
      };
      const updatedChore = await Chore.updateChore(newChore.id, choreChanges);
      expect(updatedChore.name).toBe("testing01");
    });
  });

  describe("deleteChore", function() {
    it("deletes a chore from family chores ", async function() {
      const newChore = await Chore.add({
        name: "testChore",
        description: "test description",
        parent_id: 1
      });

      const deleted = await Chore.removeChorefromList(newChore.id);
      expect(deleted.length).toBeFalsy();
    });
  });
});
