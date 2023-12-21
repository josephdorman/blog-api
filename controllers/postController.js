const Post = require("../models/post");
const Author = require("../models/author");
const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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

// Return all comments for a specific post
exports.get_post_comments = asyncHandler(async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.id });
    res.json(comments);
  } catch (err) {
    next(err);
  }
});

// Return specific comment for a specific post
exports.get_post_comment = asyncHandler(async (req, res, next) => {
  try {
    const comment = await Comment.find({
      postId: req.params.id,
      _id: req.params.commentId,
    });
    res.json(comment);
  } catch (err) {
    next(err);
  }
});

// Create a new comment for post
exports.create_comment = [
  // Validate and sanitize fields
  body("user", "User must not be empty.").trim().isLength({ min: 1 }).escape(),
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
      // Find post by id
      const post = await Post.findById(req.params.id);
      const comment = new Comment({
        user: req.body.user,
        comment: req.body.comment,
        postId: post._id,
      });
      // Save comment to post
      post.comments.push(comment);
      comment.save();
      post.save();
      res.json({
        message: "Comment created successfully",
      });
    } catch (err) {
      next(err);
    }
  }),
];

// Create a new post
exports.create_post = [
  // Validate and sanitize fields
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("content", "Content must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
  }),
];

exports.delete_post = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id).populate(
      "comments"
    );
    const comments = await Comment.deleteMany({ postId: req.params.id });
    res.json({
      msg: "Post deleted successfully",
    });
  } catch (err) {
    next(err);
  }
});

// Update specific post
exports.update_post = [
  // Validate and sanitize fields
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("content", "Content must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        content: req.body.content,
        published: req.body.published,
      });
      res.json({
        msg: "Post updated successfully",
      });
    } catch (err) {
      next(err);
    }
  }),
];

exports.publish_post = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      published: true,
    });
    post.save();
    res.json({
      msg: "Post published successfully",
    });
  } catch (err) {
    next(err);
  }
});

exports.unpublish_post = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      published: false,
    });
    post.save();
    res.json({
      msg: "Post unpublished successfully",
    });
  } catch (err) {
    next(err);
  }
});
