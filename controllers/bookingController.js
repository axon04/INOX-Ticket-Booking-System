const createBooking = async (req, res) => {
	res.send(req.body);
};
const getAllBookings = async (req, res) => {
	res.send("all Bookings");
};
const getBookingById = async (req, res) => {
	res.send("get Booking with id: " + req.params.id);
};
const updateBooking = async (req, res) => {
	res.send("update Booking with id: " + req.params.id);
};
const deleteBooking = async (req, res) => {
	res.send("delete Booking with id: " + req.params.id);
};

module.exports = {
	createBooking,
	getAllBookings,
	getBookingById,
	updateBooking,
	deleteBooking
}

