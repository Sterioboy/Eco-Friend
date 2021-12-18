const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema({
  text: { type: String, required: true },
  img: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  likes: { type: Array },
  date: { type: Date },
});

module.exports = mongoose.model("Entry", EntrySchema);
