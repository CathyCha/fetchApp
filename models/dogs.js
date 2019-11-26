/* User mongoose model */
const mongoose = require('mongoose')

const dogs = mongoose.model('dogs', {
	Owner:{
		type: String,
	},
	Dog Name:{
		type: String,
	},
	Needs:{
		type: [String],
	},
	Weight:{
		type: Number,
	},
	
})

module.exports = { dogs }
