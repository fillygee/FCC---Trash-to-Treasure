const express = require("express");
const cors = require("cors");

const posts = require("./routes/post");
const users = require("./routes/users");
const home = require("./routes/home");
const filter = require("./middleware/filter");
const logger = require("./middleware/logRoutes");
const app = express();

app.use(cors());
app.use(express.json());
// app.use(filter);
app.use(logger);

app.use(express.static("static"));

app.use("/posts", posts);
app.use("/users", users);
app.use("/", home);

module.exports = app;
