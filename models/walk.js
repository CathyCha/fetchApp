/* Walk mongoose model */
const mongoose = require('mongoose')

const CoordinateSchema = new mongoose.Schema({
    x: Number,
    y: Number
})

//simplying assumption: walk starts immediately after walker accepts
const WalkSchema = new mongoose.Schema({
    walkerId: { type: String, required: true },
    dogId: { type: String, required: true },
    walkNeeds: [String],
    price: { type: Number, required: true },
    startTime: { type: Date },
    endTime: { type: Date }, //when !completed, is an estimate
    walkerRating: Number,
    dogRating: Number,
    notes: [String],
    accepted: { type: Boolean, default: false }, //set to true when walker accepts
    completed: { type: Boolean, default: false },
    locations: [ CoordinateSchema ]
});

const Walk = mongoose.model('Walk', WalkSchema);

module.exports = { Walk }
