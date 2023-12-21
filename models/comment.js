const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
  user: { type: string, required: true },
  date: { type: Date, default: Date.now },
  comment: { type: string, required: true },
});

module.exports = mongoose.model("Comment", CommentSchema);
