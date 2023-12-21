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

router.put("/post/:id/update", post_controller.update_post);

router.delete("/post/:id/delete", post_controller.delete_post);

router.get("/post/:id/comment/:commentId", post_controller.get_post_comment);

router.post("/post/:id/comment/create", post_controller.create_comment);

router.post("/post/create", post_controller.create_post);

router.get("/post/:id/comments", post_controller.get_post_comments);

router.get("/posts", post_controller.get_posts);

/// COMMENT ROUTES ///

router.get("/comment/:id", comment_controller.get_comment);

router.put("/comment/:id/update", comment_controller.update_comment);

router.delete("/comment/:id/delete", comment_controller.delete_comment);

router.get("/comments", comment_controller.get_comments);

/// AUTHOR ROUTES ///

router.get("/author/:id", author_controller.get_author);

router.get("/authors", author_controller.get_authors);

module.exports = router;
