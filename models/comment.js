const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  blog: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  user: { type: String, required: true },
  date: { type: Date, default: Date.now },
  comment: { type: String, required: true },
});

module.exports = mongoose.model("Comment", CommentSchema);
