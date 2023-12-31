const express = require("express");
const router = express.Router();
const users = require("../controllers/users.js");
const authenticator = require("../middleware/authenticator.js");

router.get("/", users.getAll);
router.get("/:id", users.getOne);
router.post("/add", users.register);
router.delete("/delete/:id", users.deleteOne);

router.post("/login", users.login);
router.post("/logout", authenticator, users.logout);
router.post("/ping", authenticator, users.loggedInCheck);

module.exports = router;
