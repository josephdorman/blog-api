const Author = require("../models/author");
const asyncHandler = require("express-async-handler");

// Return all authors
exports.get_authors = asyncHandler(async (req, res, next) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    next(err);
  }
});

// Return specific authors
exports.get_author = asyncHandler(async (req, res, next) => {
  try {
    const author = await Author.find({ _id: req.params.id });
    res.json(author);
  } catch (err) {
    next(err);
  }
});
