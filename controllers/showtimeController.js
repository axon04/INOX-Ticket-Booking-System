const createShowtime = async (req, res) => {
	res.send(req.body);
};
const getAllShowtimes = async (req, res) => {
	res.send("all Showtimes");
};
const getShowtimeById = async (req, res) => {
	res.send("get Showtime with id: " + req.params.id);
};
const updateShowtime = async (req, res) => {
	res.send("update Showtime with id: " + req.params.id);
};
const deleteShowtime = async (req, res) => {
	res.send("delete Showtime with id: " + req.params.id);
};

module.exports = {
	createShowtime,
	getAllShowtimes,
	getShowtimeById,
	updateShowtime,
	deleteShowtime
}

