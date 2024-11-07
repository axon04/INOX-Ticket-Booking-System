require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const {connect} = require("mongoose");

// models import
const movieSchema = require("./models/movie");
const screenSchema = require("./models/screen");
const showtimeSchema = require("./models/showtime");
const bookingSchema = require("./models/booking");
const userSchema = require("./models/user");

// router imports
const movieRouter = require("./routes/movieRouter");
const showtimeRouter = require("./routes/showtimeRouter");
const screenRouter = require("./routes/screenRouter");
const bookingRouter = require("./routes/bookingRouter");
const userRouter = require("./routes/userRouter");

// create and configure express app
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

// connect to database
connect(process.env.MONGO_URI)
	.then(()=> {console.log("Connected to db!")})
	.catch((err) => {console.log("Error connecting to db: " + err)});

// plug in the routers
app.use("/movie", movieRouter);
app.use("/screen", screenRouter);
app.use("/showtime", showtimeRouter);
app.use("/booking", bookingRouter);
app.use("/user", userRouter);

// listen to port
app.listen(process.env.PORT, () => {
	console.log("Server started at \x1b[33mhttp://localhost:" + process.env.PORT + "\x1b[0m");
});
