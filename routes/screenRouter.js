const express = require('express');
const router = express.Router();

const screenController = require("../controllers/screenController");

// route prefix: "/screen"

// create screen
router.post("/", screenController.createScreen);
// get all screens
router.get("/all", screenController.getAllScreens);
// get screen by id
router.get("/:id", screenController.getScreenById);
// update screen by id
router.put("/:id", screenController.updateScreen);
// delete screen by id
router.delete("/:id", screenController.deleteScreen);

router.get("/", (req, res) => {
	console.log("/screen/");
});

module.exports = router;
