/* Student mongoose model */
const mongoose = require('mongoose')

const Student = mongoose.model('Walker', {
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
		
	}


})

module.exports = { Student }
