/* Walker mongoose model */
const mongoose = require('mongoose')

const WalkerSchema = new mongoose.Schema({
	username: { type: String, required: true, minlength: 1, trim: true},
	firstName: { type: String, required: true, minlength: 1, trim: true},
	lastName: { type: String, required: true, minlength: 1, trim: true},
	homeAddress: { type: String, required: true },
	city: { type: String, default: "Toronto" },
	province: { type: String, default: "Ontario" },
	phoneNumber: { type: Number, minlength: 9},
	emailAddress: { type: String, required: true },
	dateJoined: Date,
	languages: String,
	qualifications: String,
	rating: Number
});

const Walker = mongoose.model('Walker', WalkerSchema);

module.exports = { Walker }
