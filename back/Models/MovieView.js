const mongoose = require('mongoose');

const MovieViewSchema = mongoose.Schema({
  patron_id: { type: String, required: true }, //user pseudo
  movie_id: { type: String, required: true },
  movie_src: { type: String, required: true },
  movie_title: { type: String, required: true },
  date: { type: Date, required: true }
})

module.exports = mongoose.model('MovieView', MovieViewSchema);