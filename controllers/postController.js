const Post = require("../models/post");
const Author = require("../models/author");
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

// Create a new post
exports.create_post = asyncHandler(async (req, res, next) => {
  try {
    const author = await Author.findOne();
    const post = new Post({
      title: req.body.title,
      author: author._id,
      content: req.body.content,
      published: req.body.published,
    });
    post.save();
    res.json({
      message: "Post created successfully",
    });
  } catch (err) {
    next(err);
  }
});
