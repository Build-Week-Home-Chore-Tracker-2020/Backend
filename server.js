const express = require("express");

const authRouter = require("./auth/auth-router");
const choreRouter = require("./routes/chore-router");

const server = express();

server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/chores", choreRouter);

// server.get("/", (req, res) => {
//   res.send("<h1>hello</h1>");
// });

module.exports = server;
