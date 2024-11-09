const MovieValidator = require("../utils/movieValidator");
const movieValidator = new MovieValidator();
const Movie = require("../models/movie");

const getAllMovies = async (req, res) => {
	try{
		const allMovies = await Movie.find({});
		return res.status(200).json(allMovies);
	} catch(err) {
		console.log(err);
		return res.status(500).json({"error": "Server issue"})
	}	
};

const getMovieByName = async (req, res) => {
	try{
		const allMovies = await Movie.find({name: req.query.name});
		return res.status(200).json(allMovies);
	} catch(err) {
		console.log(err);
		return res.status(500).json({"error": "Server issue"})
	}	
};

const getMovieById =  async (req, res) => {
	try{
		const existingMovie = await Movie.findById(req.params.id);
		// if no movie exists return
		if (!existingMovie) { 
			return res.status(400).json({"error": `No movie exists with id: ${req.params.id}`})
		}
		return res.status(200).json(existingMovie);
	} catch(err) {
		console.log(err);
		return res.status(500).json({"error": "Server issue"})
	}
};

const createMovie = async (req, res) => {
	
	// check if JSON is valid
	const validationResult = movieValidator.validate(req.body, 'POST');
	if (!validationResult.valid) {
		return res.status(400).json(validationResult.invalidProperties);
	}
	
	//create document
	const newMovie = new Movie(req.body);
	
	try {
		// save to database
		const savedMovie = await newMovie.save();
		
		// return saved object
		return res.status(201).json(savedMovie);
	} catch (err) {
		res.status(500).json({"error" : err});
	}
};

const updateMovie = async (req, res) => {
	
	// check if JSON is valid
	const validationResult = movieValidator.validate(req.body, 'PUT');
	if (!validationResult.valid) {
		return res.status(400).json(validationResult.invalidProperties);
	}
	
	// get the object from json
	const {name, language, duration, genre, cast, director, release_date, description,image} = req.body
	
	// find the document by id
	try {
		const existingMovie = await Movie.findById(req.params.id);
		// if not exists return
		if (!existingMovie) {
			return res.status(400).json({"error": `No movie exists with id: ${req.params.id}`});
		}
		// update document
		existingMovie.name = name;
		existingMovie.language = language;
		existingMovie.duration = duration;
		existingMovie.genre = genre;
		existingMovie.cast = cast;
		existingMovie.director = director;
		existingMovie.release_date = release_date;
		existingMovie.description = description;
		existingMovie.image = image;
		
		// save the document
		const updatedMovie = await existingMovie.save();
		//return the saved document
		return res.status(200).json(updatedMovie);
		
	} catch (err) {
		console.log(err)
		res.status(500).json({"error" : err});
	}
};

const partialUpdateMovie = async (req, res) => {
	// check if JSON is valid
	const validationResult = movieValidator.validate(req.body, 'PATCH');
	if (!validationResult.valid) {
		return res.status(400).json(validationResult.invalidProperties);
	}
	
	// get the object from json
	const {name, language, duration, genre, cast, director, release_date, description,image} = req.body
	
	// find the document
	try {
		const existingMovie = await Movie.findById(req.params.id);
		// if not exists return
		if (!existingMovie) {
			return res.status(400).json({"error": `No movie exists with id: ${req.params.id}`});
		}
		// update the document
		if (name !== undefined) existingMovie.name = name;
		if (language !== undefined) existingMovie.language = language;
		if (duration !== undefined) existingMovie.duration = duration;
		if (genre !== undefined) existingMovie.genre = genre;
		if (cast !== undefined) existingMovie.cast = cast;
		if (director !== undefined) existingMovie.director = director;
		if (release_date !== undefined) existingMovie.release_date = release_date;
		if (description !== undefined) existingMovie.description = description;
		if (image !== undefined) existingMovie.image = image;
		
		// save the document
		const updatedMovie = await existingMovie.save();
		//return the saved document
		return res.status(200).json(updatedMovie);
		
	} catch (err) {
		console.log(err)
		res.status(500).json({"error" : err});
	}
}

const deleteMovie = async (req, res) => {
	// find the movie
	try{
		const existingMovie = await Movie.findById(req.params.id);
		// if no movie exists return
		if (!existingMovie) { 
			return res.status(400).json({"error": `No movie exists with id: ${req.params.id}`})
		}
		await Movie.findByIdAndDelete(req.params.id);
		return res.status(204).json({"message": "Deleted successfully"});
	} catch(err) {
		console.log(err);
		return res.status(500).json({"error": "Server issue"})
	}
};

module.exports = {
	getAllMovies,
	getMovieByName,
	getMovieById,
	createMovie,
	updateMovie,
	partialUpdateMovie,
	deleteMovie
};