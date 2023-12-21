const Comment = require("../models/comment");
const Post = require("../models/post");
const asyncHandler = require("express-async-handler");

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
