const MovieValidator = require("../utils/movieValidator");
const movieValidator = new MovieValidator();

const getAllMovies = async (req, res) => {
	res.send("get all movies");
};

const getMovieByName = async (req, res) => {
	console.log(req.query);
	res.send("get movie by name: " + req.query.name);
};

const getMovieById =  async (req, res) => {
	res.send("get movie by id: " + req.params.id);
};

const createMovie = async (req, res) => {
	
	// check if JSON is valid
	const validationResult = movieValidator.validate(req.body);
	if (!validationResult.valid) {
		return res.status(400).json(validationResult.invalidProperties);
	}
	
	// get the object from json
	const {name, language, duration, genre, cast, director, release_date, description,image} = req.body
	
	// save to database
	
	// return saved object
	
	console.log(req.body);
	res.send(req.body);
};

const updateMovie = async (req, res) => {
	res.send("full update movie (PUT) with id: " + req.params.id);
};

const deleteMovie = async (req, res) => {
	res.send("delete movie with id: "  + req.params.id);
};

module.exports = {
	getAllMovies,
	getMovieByName,
	getMovieById,
	createMovie,
	updateMovie,
	deleteMovie
};