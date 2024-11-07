const express = require('express');
const router = express.Router();

const showtimeController = require("../controllers/showtimeController");

// route prefix: "/showtime"

// create showtime
router.post("/", showtimeController.createShowtime);
// get all showtimes
router.get("/all", showtimeController.getAllShowtimes);
// get showtime by id
router.get("/:id", showtimeController.getShowtimeById);
// update showtime
router.put("/:id", showtimeController.updateShowtime);
// delete showtime
router.delete("/:id", showtimeController.deleteShowtime);

router.get("/", (req, res) => {
	console.log("/showtime/");
});

module.exports = router;
