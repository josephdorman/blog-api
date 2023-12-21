const express = require("express");
const router = express.Router();

// Require controller modules.
const authorController = require("../controllers/authorController");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json("Hello World!");
});

module.exports = router;
