/* User mongoose model */
const mongoose = require('mongoose')

const DogSchema = new mongoose.Schema({
	dogName: { type: String, required: true },
	needs: [String],
	weight: Number,
	rating: Number
});

const Dog = mongoose.model('Dog', DogSchema);

module.exports = { Dog, DogSchema };
