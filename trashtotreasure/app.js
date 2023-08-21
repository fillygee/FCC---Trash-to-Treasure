const express = require("express");
const cors = require("cors");

const cats = require("./routes/cats");
const users = require("./routes/users");
const home = require("./routes/home");
const filter = require("./middleware/filter");

const app = express();

app.use(cors());
app.use(express.json());
app.use(filter);

app.use(express.static("static"));


app.use("/cats", cats);
app.use("/users", users);
app.use("/", home);

module.exports = app;
