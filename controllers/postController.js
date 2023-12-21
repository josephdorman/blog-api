const Post = require("../models/post");
const asyncHandler = require("express-async-handler");

// Return all posts
exports.get_posts = asyncHandler(async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

// Return specific post
exports.get_post = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.find({ _id: req.params.id });
    res.json(post);
  } catch (err) {
    next(err);
  }
});
