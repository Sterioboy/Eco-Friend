const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  entry: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Entry" },
  text: { type: String, required: true },
  date: { type: Date, default: new Date() },
});

module.exports = mongoose.model("Comment", CommentSchema);
