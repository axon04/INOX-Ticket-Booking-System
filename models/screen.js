const { Schema, model } = require('mongoose');

const screenSchema = new Schema({
    name: {
        type: String, 
        enum:["2D", "3D", "IMAX 3D"], 
        required: true
    },
    seats: [{
        type: Schema.Types.Mixed,
        required: true
    }],
	seatCount: {        
        type: Number,                   
        required: true
    }
});

module.exports = model('Screen', screenSchema);

/**
 * Seats are stored as an array of mixed type. This is because each seat can be of different type.
 * The seatCount field stores the total number of seats in the screen.
 * 
 * seats will have subdocuments with the following fields:
 * - row: The row number of the seat.
 * - number: The seat number.
 * - status: The status of the seat. It can be either available or booked.
 * - price: The price of the seat.
 * - tier: The type of the seat. It can be gold, silver, or platinum.
 * 
 * --- There will be no model for this schema below: ---
 * 
 * const seatSchema = new Schema({
 *   row: { type: Number, required: true },
 *   number: { type: Number, required: true },
 *   status: { type: String, enum: ['available', 'booked'], default: 'available' },
 *   price: { type: Number, required: true },
 *   tier: { type: String, enum: ['gold', 'silver', 'platinum'], required: true }
 * });
 * 
 * 
 */