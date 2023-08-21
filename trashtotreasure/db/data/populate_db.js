require("dotenv").config();

const fs = require("fs");
const db = require("../db");

const sql = fs.readFileSync("./db/data/sample_data.sql").toString();

db.query(sql)
    .then((data) => db.end().then(() => console.log("Populated db with: " + data.length + " entries!")))
    .catch((error) => console.log(error));
