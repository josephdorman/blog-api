const Comment = require("../models/comment");
const Post = require("../models/post");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Return all comments
exports.get_comments = asyncHandler(async (req, res, next) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    next(err);
  }
});

// Return specific comments
exports.get_comment = asyncHandler(async (req, res, next) => {
  try {
    const comment = await Comment.find({ _id: req.params.id });
    res.json(comment);
  } catch (err) {
    next(err);
  }
});

// Delete specific comment
exports.delete_comment = asyncHandler(async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    const post = await Post.findById(comment.postId);
    post.comments.pull(comment);
    post.save();
    res.json({
      message: "Comment deleted successfully",
    });
  } catch (err) {
    next(err);
  }
});

// Update specific comment
exports.update_comment = [
  // Validate and sanitize fields
  body("comment", "Comment must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const comment = await Comment.findByIdAndUpdate(req.params.id, {
        comment: req.body.comment,
      });
      comment.save();
      res.json({
        msg: "Comment updated successfully",
      });
    } catch (err) {
      next(err);
    }
  }),
];
