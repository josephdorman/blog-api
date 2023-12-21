const express = require("express");
const router = express.Router();

// Require controller modules.
const author_controller = require("../controllers/authorController");
const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json("Hello World!");
});

module.exports = router;
