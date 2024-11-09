const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");

// route prefix: "/user"

// create user
router.post("/", userController.createUser);
// get all users
router.get("/all", userController.getAllUsers);
// get user by id
router.get("/:id", userController.getUserById);
// update user
router.patch("/:id", userController.updateUser);
// delete user
router.delete("/:id", userController.deleteUser);

router.get("/", (req, res) => {
	console.log("/user/");
});

module.exports = router;
