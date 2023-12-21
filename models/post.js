const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  date: { type: Date, default: Date.now },
  content: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  published: { type: Boolean, default: false, required: true },
});

modules.exports = mongoose.model("Post", PostSchema);
