const createUser = async (req, res) => {
	res.send(req.body);
};
const getAllUsers = async (req, res) => {
	res.send("all Users");
};
const getUserById = async (req, res) => {
	res.send("get User with id: " + req.params.id);
};
const updateUser = async (req, res) => {
	res.send("update User with id: " + req.params.id);
};
const deleteUser = async (req, res) => {
	res.send("delete User with id: " + req.params.id);
};

module.exports = {
	createUser,
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser
}

