const express = require('express');
const router = express.Router();

const movieController = require("../controllers/movieController");

// route prefix: "/movie"

// USER

// get all movies 
router.get("/all", movieController.getAllMovies);
// get a movie by name
router.get("/search", movieController.getMovieByName);

// ADMIN

// get a movie by id
router.get("/:id", movieController.getMovieById);
// create a movie
router.post("/", movieController.createMovie);
// update a movie by id
router.put("/:id", movieController.updateMovie);
// partial update by id
router.patch("/:id", movieController.partialUpdateMovie);
// delete a movie by id
router.delete("/:id", movieController.deleteMovie);


router.get("/", (req, res) => {
	res.send("/movie/");
});

module.exports = router;