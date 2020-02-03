const express = require("express");

const authRouter = require("./auth/auth-router");
const choreRouter = require("./routes/chore-router");
const parentRouter = require("./routes/parent-router");
const childRouter = require("./routes/child-router");

const server = express();

server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/chores", choreRouter);
server.use("/api/parent", parentRouter);
server.use("/api/child", childRouter);

// server.get("/", (req, res) => {
//   res.send("<h1>hello</h1>");
// });

module.exports = server;
