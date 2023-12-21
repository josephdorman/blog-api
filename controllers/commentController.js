const Comment = require("../models/comment");
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
