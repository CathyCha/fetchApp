/* Walk mongoose model */
const mongoose = require('mongoose')

const coordinateSChema = new mongoose.Schema

const WalkSchema = new mongoose.Schema({
    walkerId: { type: String, required: true },
    dogId: { type: String, required: true },
    completed: Boolean,
    locations: [ Coordinate ]
});

const Walk = mongoose.model('Walk', WalkSchema);

module.exports = { Walk }
