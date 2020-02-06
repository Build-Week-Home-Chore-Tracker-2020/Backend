const Child = require("./child-model");
const Parent = require("./parent-model");
const db = require("../data/dbConfig");

describe("parent-model", function() {
  beforeEach(async () => {
    await db("parent").truncate();
  });
  beforeEach(async () => {
    await db("child").truncate();
  });
  describe("add", function() {
    it("adds a parent", async function() {
      await Parent.add({
        username: "testingParent",
        name: "testingParent",
        email: "email@email.com",
        password: "testing"
      });
      const parent = await db("parent");
      expect(parent).toHaveLength(1);
    });
  });

  describe("findBy", function() {
    it("finds a parent by username", async function() {
      const newParent = await Parent.add({
        username: "testingParent",
        name: "testingParent",
        email: "email@email.com",
        password: "testing"
      });
      const parent = await Parent.findBy({ username: newParent.username });
      expect(parent).toHaveLength(1);
    });
  });

  describe("findById", function() {
    it("finds a parent by id", async function() {
      const newParent = await Parent.add({
        username: "testing",
        name: "testing",
        email: "email@email.com",
        password: "testing"
      });
      const parent = await Parent.findById(newParent.id);
      expect(parent.name).toBe("testing");
    });
  });

  describe("updateParent", function() {
    it("updates a parent information", async function() {
      const newParent = await Parent.add({
        username: "testing",
        name: "testing",
        email: "email@email.com",
        password: "testing"
      });

      const parentChanges = {
        name: "testing01"
      };
      const updatedParent = await Parent.updateParent(
        newParent.id,
        parentChanges
      );
      expect(updatedParent.name).toBe("testing01");
    });
  });

  describe("getParentChildren", function() {
    it("gets a parents children", async function() {
      const newParent = await Parent.add({
        username: "testing",
        name: "testing",
        email: "email@email.com",
        password: "testing"
      });

      const newChild = await Child.add({
        username: "testingChild",
        name: "testingChild",
        password: "testingChild",
        parent_id: 1
      });

      const children = await Parent.getParentChildren(newChild.parent_id);
      expect(children).toHaveLength(1);
    });
  });
});
