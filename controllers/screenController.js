const createScreen = async (req, res) => {
	res.send(req.body);
};
const getAllScreens = async (req, res) => {
	res.send("all screens");
};
const getScreenById = async (req, res) => {
	res.send("get screen with id: " + req.params.id);
};
const updateScreen = async (req, res) => {
	res.send("update screen with id: " + req.params.id);
};
const deleteScreen = async (req, res) => {
	res.send("delete screen with id: " + req.params.id);
};

module.exports = {
	createScreen,
	getAllScreens,
	getScreenById,
	updateScreen,
	deleteScreen
}
