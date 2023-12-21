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

/// POST ROUTES ///

router.get("/post/:id", post_controller.get_post);

router.get("/post/:id/comments", post_controller.get_post_comments);

router.post("/post/create", post_controller.create_post);

router.get("/posts", post_controller.get_posts);

/// COMMENT ROUTES ///

router.get("/comment/:id", comment_controller.get_comment);

router.get("/comments", comment_controller.get_comments);

/// AUTHOR ROUTES ///

router.get("/author/:id", author_controller.get_author);

router.get("/authors", author_controller.get_authors);

module.exports = router;
