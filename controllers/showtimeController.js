const Showtime = require("../models/showtime");

const createShowtime = async (req, res) => {
	//create document
	const newShowtime = new Showtime(req.body);
	try {
		// save to database
		const savedShowtime = await newShowtime.save();
		// TODO: check for foreign key error and send in response
		// return saved object
		return res.status(201).json(savedShowtime);
	} catch (err) {
		res.status(500).json({"error" : err});
	}
};

const getAllShowtimes = async (req, res) => {
	try{
		// TODO: use 'select' field for movie and Showtime to limit data being sent.
		// TODO: non existent id also being accepted.
		const allShowtimes = await Showtime.find({}).populate([{path: 'movie'}, {path: 'screen'}]);
		return res.status(200).json(allShowtimes);
	} catch(err) {
		console.log(err);
		return res.status(500).json({"error": "Server issue"})
	}
};

const getShowtimeById = async (req, res) => {
	try{
		// TODO: use 'select' field for movie and Showtime to limit data being sent.
		const existingShowtime = await Showtime.findById(req.params.id).populate([{path: 'movie'}, {path: 'screen'}]);
		return res.status(200).json(existingShowtime);
	} catch(err) {
		console.log(err);
		return res.status(500).json({"error": "Server issue"})
	}
};

const updateShowtime = async (req, res) => {
	// get the object from body
	const {movie, screen, startTime, endTime, date, price} = req.body;
	// find the document
	try {
		const existingShowtime = await Showtime.findById(req.params.id);
		// if not exists return
		if (!existingShowtime) {
			return res.status(400).json({"error": `No showtime exists with id: ${req.params.id}`});
		}
		existingShowtime.movie = movie;
		existingShowtime.screen = screen;
		existingShowtime.startTime = startTime;
		existingShowtime.endTime = endTime;
		existingShowtime.date = date;
		existingShowtime.price = price;
		// save the document  
		const updatedShowtime = await existingShowtime.save();
		return res.status(200).json(updatedShowtime);
	} catch(err) {
		console.log(err);
		return res.status(500).json({"error": "Server issue"})
	}
};

const deleteShowtime = async (req, res) => {
	// find the showtime
	try{
		const existingShowtime = await Showtime.findById(req.params.id);
		// if no showtime exists return
		if (!existingShowtime) { 
			return res.status(400).json({"error": `No showtime exists with id: ${req.params.id}`})
		}
		await Showtime.findByIdAndDelete(req.params.id);
		return res.status(204).json({"message": "Deleted successfully"});
	} catch(err) {
		console.log(err);
		return res.status(500).json({"error": "Server issue"})
	}
};

module.exports = {
	createShowtime,
	getAllShowtimes,
	getShowtimeById,
	updateShowtime,
	deleteShowtime
}

