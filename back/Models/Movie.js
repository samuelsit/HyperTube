const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
  movie_id: { type:String, unique: true, required: true },
  movie_src: { type: String, required: true },
  torrent_v: { type: Number, required: true},
  title: { type: String, required: true },
  uploadDate: { type: Date, required: true },
  lastViewDate: { type: Date, require: true },
  fileName: {type: String, required: true }
});

module.exports = mongoose.model('Movie', MovieSchema);