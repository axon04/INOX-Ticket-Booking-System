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