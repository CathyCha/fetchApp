/* Walker mongoose model */
const mongoose = require('mongoose')

const walker = mongoose.model('walker', {
	First Name: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	Last Name: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
		// default: 1
	},
	Address: {
		type: String,
		required: true,
	},
	City: {
		type: String,
		// required: true,
		default: "Toronto"
	},
	Province:{
		type: String,
		default: "Ontario"
	},
	Phone Number: {
		type: Number,
		minlength: 9,
	},
	Email Address: {
		type: String,
	},
	Date Joined: {
		type: Date,
	},
	Languages:{
		type: String,
	},
	qualifications:{
		type: String,
	},
})

module.exports = { walker }
