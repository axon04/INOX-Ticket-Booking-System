const { Schema, model } = require('mongoose');
const movie = require('./movie');

const bookingSchema = new Schema({
	customer: {
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    },
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
    showtime: {
        type: Schema.Types.Mixed,
        required: true
    },
    seats: [{
        type: Schema.Types.Mixed,
        required: true
    }],
    totalPrice: {
        type: Number, 
        required: true
    },
    status: {
        type: String, 
        enum: ['booked', 'cancelled'], 
        default: 'booked'
    }
});

module.exports = model("Booking", bookingSchema);

/**
 * The showtime field is a subdocument with the following fields:
 * - startTime: The start time of the show.
 * - endTime: The end time of the show.
 * - date: The date of the show.
 * - price: The price of the show.
 * 
 * --- There will be no model for this schema below: ---
 * 
 * const showtimeSchema = new Schema({
 *     startTime: { type: Date, required: true },
 *     endTime: { type: Date, required: true },
 *     date: { type: Date, required: true },
 *     price: { type: Number, required: true }
 * });
 * 
 * The showtime is not referred to reduce the number of queries required to fetch the booking details.
 */