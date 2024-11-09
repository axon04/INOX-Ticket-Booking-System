const User = require("../models/user");

const createUser = async (req, res) => {
	const newUser = new User(req.body);
	try {
		const savedUser = await newUser.save();
		return res.status(201).json(savedUser);
	} catch (err) {
		console.log(err);
		return res.status(500).json({"error": "Server issue"});
	}

};


const getAllUsers = async (req, res) => {
	try {
		const allUsers = await User.find({});
		return res.status(200).json(allUsers);
	} catch (err) {
		console.log(err);
		return res.status(500).json({"error": "Server issue"});
	}
};


const getUserById = async (req, res) => {
	const id = req.params.id;
	try {
		const existingUser = await User.findById(id);
		if (!existingUser) {
			return res.status(400).json({"error": `No user exists with id: ${id}`});
		}
		return res.status(200).json(existingUser);
	} catch (err) {
		
		console.log(err);
		return res.status(500).json({"error": "Server issue"});
	}




	// res.send("get User with id: " + req.params.id);
};
const updateUser = async (req, res) => {

	const id = req.params.id;
	try {
		const existingUser = await User.findById(id);
		if (!existingUser) {
			return res.status(400).json({"error": `No user exists with id: ${id}`});
		}
		const updated = await User.findByIdAndUpdate(id, req.body, {new: true});
		return res.status(200).json(updated); 
	} catch (err) {
		console.log(err);
		return res.status(500).json({"error": "Server issue"});
	}
};


const deleteUser = async (req, res) => {
	const id = req.params.id;
	try {
		const existingUser = await User.findById(id);
		if (!existingUser) {
			return res.status(400).json({"error": `No user exists with id: ${id}`});
		}
		await User.findByIdAndDelete(id);
		return res.status(200).json({"message": `User with id: ${id} deleted`});
	}
	catch (err) {
		console.log(err);
		return res.status(500).json({"error": "Server issue"});
	}
};

module.exports = {
	createUser,
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser
}

