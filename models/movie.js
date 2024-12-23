const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
	name: {
        type: String, 
        required: true
    },
	language: [{
        type: String, 
        required: true
    }],
	duration: {
        type: Number,      // time in seconds
        required: true
    }, 	
	genre: {
        type: String, 
        required: true
    },
	cast: [{
        type: String, 
        required: true
    }], 
	director: {
        type: String, 
        required: true
    },
	release_date: {
        type: Date, 
        required: true
    },
	description: {
        type: String, 
        required: true
    },
	image: {
		type: String
	}
}, {timestamps: true});

module.exports = model('Movie', movieSchema);