const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  entry: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Entry' },
  date: { type: Date, default: new Date() },
});

module.exports = mongoose.model("Like", LikeSchema);
