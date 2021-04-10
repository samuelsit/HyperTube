const mongoose = require('mongoose');

const SubtitleSchema = mongoose.Schema({
  patron_id: { type: String, required: true }, //movie_id
  movie_src: { type: String, required: true },
  language: { type: String, required: true },
  file: { type: String, required: true }
})

module.exports = mongoose.model('Subtitle', SubtitleSchema);