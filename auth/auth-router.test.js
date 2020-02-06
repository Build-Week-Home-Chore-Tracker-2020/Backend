const Auth = require("../server");
const request = require("supertest");
const db = require("../data/dbConfig.js");

describe("auth-router", function() {
  beforeEach(async () => {
    await db("parent").truncate();
  });
  beforeEach(async () => {
    await db("child").truncate();
  });

  describe("Parent Register", function() {
    it("registers a parent", async function() {
      const Parent = {
        username: "parent01",
        name: "Parent",
        email: "email@email.com",
        password: "testing"
      };
      const res = await request(Auth)
        .post("/api/auth/register")
        .set("Accept", "application/json")
        .send(Parent);
      expect(res.status).toEqual(201);
    });
  });

  describe("register a child", function() {
    it("registers a child", async function() {
      const Child = {
        username: "child01",
        name: "Child",
        password: "testing"
      };
      const res = await request(Auth)
        .post("/api/auth/register/2")
        .set("Accept", "application/json")
        .send(Child);
      expect(res.status).toEqual(201);
    });
  });

  describe("Parent Login", function() {
    it("logs a parent in", async function() {
      const Parent = {
        username: "parent01",
        name: "Parent",
        email: "email@email.com",
        password: "testing"
      };
      const res = await request(Auth)
        .post("/api/auth/register")
        .set("Accept", "application/json")
        .send(Parent);

      const login = await request(Auth)
        .post("/api/auth/login")
        .expect("Content-Type", /json/)
        .send({ username: "parent01", password: "testing" });
      expect(login.status).toBe(200);
    });
  });

  describe("Child Login", function() {
    it("logs a child in", async function() {
      const Parent = {
        username: "parent01",
        name: "Parent",
        email: "email@email.com",
        password: "testing"
      };

      const Child = {
        username: "child01",
        name: "Child",
        password: "testing"
      };

      const res = await request(Auth)
        .post("/api/auth/register")
        .set("Accept", "application/json")
        .send(Parent);

      const child = await request(Auth)
        .post("/api/auth/register/2")
        .set("Accept", "application/json")
        .send(Child);

      const login = await request(Auth)
        .post("/api/auth/login/child")
        .expect("Content-Type", /json/)
        .send({ username: "child01", password: "testing" });
      expect(login.status).toBe(200);
    });
  });
});
