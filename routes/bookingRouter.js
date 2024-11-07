const express = require('express');
const router = express.Router();

const bookingController = require("../controllers/bookingController");

// route prefix: "/booking"

// create booking
router.post("/", bookingController.createBooking);
// get all bookings
router.get("/all", bookingController.getAllBookings);
// get booking by id
router.get("/:id", bookingController.getBookingById);
// update booking
router.put("/:id", bookingController.updateBooking);
// delete booking
router.delete("/:id", bookingController.deleteBooking);

router.get("/", (req, res) => {
	console.log("/booking/");
});

module.exports = router;
