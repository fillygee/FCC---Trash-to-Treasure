const express = require("express");
const router = express.Router();
const home = require("../controllers/home");
const authenticator = require("../middleware/authenticator");

router.get("/register", home.register);
router.get("/login", home.login);

router.get("/homepage", authenticator, home.homepage);
router.get("*", (req, res) => {
  res.redirect("/");
});

module.exports = router;
