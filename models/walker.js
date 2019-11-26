/* Walker mongoose model */
const mongoose = require('mongoose')

const walker = mongoose.model('walker', {
	firstName: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	lastName: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
		// default: 1
	},
	homeAddress: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		// required: true,
		default: "Toronto"
	},
	province:{
		type: String,
		default: "Ontario"
	},
	phoneNumber: {
		type: Number,
		minlength: 9,
	},
	emailAddress: {
		type: String,
	},
	dateJoined: {
		type: Date,
	},
	languages:{
		type: String,
	},
	qualifications:{
		type: String,
	},
})

module.exports = { walker }
