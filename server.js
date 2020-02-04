const cors = require("cors");
const helmet = require("helmet");
const express = require("express");

const { authenticate } = require("./auth/utils");

const authRouter = require("./auth/auth-router");
const choreRouter = require("./routes/chore-router");
const parentRouter = require("./routes/parent-router");
const childRouter = require("./routes/child-router");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/chores", authenticate, choreRouter);
server.use("/api/parent", authenticate, parentRouter);
server.use("/api/child", authenticate, childRouter);

// server.get("/", (req, res) => {
//   res.send("<h1>hello</h1>");
// });

module.exports = server;
