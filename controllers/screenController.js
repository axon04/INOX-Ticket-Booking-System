const Screen = require("../models/screen");

const createScreen = async (req, res) => {
	//create document
	const newScreen = new Screen(req.body);
	
	try {
		// save to database
		const savedScreen = await newScreen.save();
		
		// return saved object
		return res.status(201).json(savedScreen);
	} catch (err) {
		res.status(500).json({"error" : err});
	}
};

const getAllScreens = async (req, res) => {
	try{
		const allScreens = await Screen.find({});
		return res.status(200).json(allScreens);
	} catch(err) {
		console.log(err);
		return res.status(500).json({"error": "Server issue"})
	}
};

const getScreenById = async (req, res) => {
	try{
		const existingScreen = await Screen.findById(req.params.id);
		// if no screen exists return
		if (!existingScreen) { 
			return res.status(400).json({"error": `No screen exists with id: ${req.params.id}`})
		}
		return res.status(200).json(existingScreen);
	} catch(err) {
		console.log(err);
		return res.status(500).json({"error": "Server issue"})
	}
};

const updateScreen = async (req, res) => {
	// get the object from body
	const {name, seats, seatCount} = req.body;
	// find the document
	try {
		const existingScreen = await Screen.findById(req.params.id);
		// if not exists return
		if (!existingScreen) {
			return res.status(400).json({"error": `No screen exists with id: ${req.params.id}`});
		}
		existingScreen.name = name;
		existingScreen.seats = seats;
		existingScreen.seatCount = seatCount;
		// save the document  
		const updatedScreen = await existingScreen.save();
		return res.status(200).json(updatedScreen);
	} catch(err) {
		console.log(err);
		return res.status(500).json({"error": "Server issue"})
	}
};

const deleteScreen = async (req, res) => {
	// find the screen
	try{
		const existingScreen = await Screen.findById(req.params.id);
		// if no screen exists return
		if (!existingScreen) { 
			return res.status(400).json({"error": `No screen exists with id: ${req.params.id}`})
		}
		await Screen.findByIdAndDelete(req.params.id);
		return res.status(204).json({"message": "Deleted successfully"});
	} catch(err) {
		console.log(err);
		return res.status(500).json({"error": "Server issue"})
	}
};

module.exports = {
	createScreen,
	getAllScreens,
	getScreenById,
	updateScreen,
	deleteScreen
}
