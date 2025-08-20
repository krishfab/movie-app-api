const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: String,
  year: Number,
  description: String,
  genre: String,
  comments: [commentSchema]
});

module.exports = mongoose.model("Movie", movieSchema);