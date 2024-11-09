const Booking = require('../models/booking');

const createBooking = async (req, res) => {
	const newBooking = new Booking(req.body);
	try {
		// save to database
		const savedBooking = await newBooking.save();
		// TODO: check for foreign key error and send in response
		// return saved object
		return res.status(201).json(savedBooking);
	} catch (err) {
		res.status(500).json({"error" : err});
	}
};
const getAllBookings = async (req, res) => {
	try{
		// TODO: use 'select' field for movie and Showtime to limit data being sent.
		// TODO: non existent id also being accepted.
		const allBooking = await Booking.find({}).populate("movie").populate("screen").populate("user");
		return res.status(200).json(allBooking);
	} catch(err) {
		console.log(err);
		return res.status(500).json({"error": "Server issue"})
	}
};
const getBookingById = async (req, res) => {
	try{
		const existingBooking = await Booking.findById(req.params.id).populate("movie").populate("screen").populate("user");
		// if not exists return 
		if (!existingBooking) {
			return res.status(400).json({"error": `No booking exists with id: ${req.params.id}`});
		}
		return res.status(200).json(existingBooking);
	}catch(err){
		console.log(err);
		return res.status(500).json({"error": "Server issue"})
	}
};
const updateBooking = async (req, res) => {
	const {movie, screen, user, showtime, seats, totalprice, status} = req.body;
	try {
		const existingBooking = await Booking.findById(req.params.id);
		if (!existingBooking) {
			return res.status(400).json({"error": `No booking exists with id: ${req.params.id}`});
		}
		existingBooking.user = user;
		existingBooking.movie = movie;
		existingBooking.screen = screen;
		existingBooking.showtime = showtime;
		existingBooking.seats = seats;
		existingBooking.totalprice = totalprice;
		existingBooking.status = status;
		// save the document
		const updatedBooking = await existingBooking.save();
		return res.status(200).json(updatedBooking);
	}
	catch(err){
		console.log(err);
		return res.status(500).json({"error": "Server issue"})
	}
};


const deleteBooking = async (req, res) => {
	try{
		// find the document
		const existingBooking = await Booking.findById(req.params.id);
		// if not exists return
		if (!existingBooking) {
			return res.status(400).json({"error": `No booking exists with id: ${req.params.id}`});
		}
		// delete the document
		await Booking.findByIdAndDelete(req.params.id);
		return res.status(200).json({"message": "Booking deleted successfully"});

	}
	catch(err){
		console.log(err);
		return res.status(500).json({"error": "Server issue"})
	}
};

module.exports = {
	createBooking,
	getAllBookings,
	getBookingById,
	updateBooking,
	deleteBooking
}

