const { Schema, model } = require('mongoose');

const showtimeSchema = new Schema({
	movie: {
        type: Schema.Types.ObjectId, 
        ref: "Movie", 
        required: true
    },
	screen: {
        type: Schema.Types.ObjectId, 
        ref: "Screen", 
        required: true
    },
	startTime: {
        type: Date, 
        required: true
    },
	endTime: {          
        type: Date, 
        required: true
    },	
	date: {
        type: Date, 
        required: true
    },	
	price: {
        type: Number, 
        required: true
    }
}, {timestamps: true});

module.exports = model("Showtime", showtimeSchema);