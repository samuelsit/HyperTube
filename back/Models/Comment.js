const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  patron_id: { type: String, required: true }, // user pseudo
  movie_id: { type: String, required: true },
  movie_src: { type: String, required: true },
  // movie_title: { type: String, required: true },
  value: { type: String, required: true, maxlength: 250},
  date: { type: Date, required: true }
})

module.exports = mongoose.model('Comment', CommentSchema);