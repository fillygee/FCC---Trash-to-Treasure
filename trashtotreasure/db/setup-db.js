require("dotenv").config();

const fs = require("fs");
const db = require("./db");

const sql = fs.readFileSync("./db/setup.sql").toString();

db.query(sql)
    .then((data) => {
        db.end().then(r => console.log("Set-up complete, a total of " + data.length / 2 + " table(s) were created!"
        ));
    })
    .catch((error) => console.log(error));
