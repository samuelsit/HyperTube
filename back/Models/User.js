const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	email: { type: String, unique: true, required: true },
	pseudo: { type: String, index: true, unique: true, required: true },
	password: { type: String },
	lastname: { type: String, required: true },
	firstname: { type: String, required: true },
	picture: { type: String, default: 'noPic.png' },
	isVerified: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);