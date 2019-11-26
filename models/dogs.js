/* User mongoose model */
const mongoose = require('mongoose')

const dogs = mongoose.model('dogs', {
	owner:{
		type: String,
	},
	dogName:{
		type: String,
	},
	needs:{
		type: [String],
	},
	weight:{
		type: Number,
	},
	
})

module.exports = { dogs }
