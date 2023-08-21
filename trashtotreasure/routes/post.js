const express = require("express");
const router = express.Router();
const post = require("../controllers/post");
const authenticator = require("../middleware/authenticator");

router.get("/", authenticator, posts.getAll);
router.get("/:id", authenticator, posts.getOne);
router.post("/add", authenticator, posts.addOne);
router.get("/delete/:id", authenticator, posts.deleteOne);

module.exports = router;
