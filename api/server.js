const express = require("express");
const mongoose = require("mongoose");
const { errorHandler, AuthError } = require("./Middlewares/errorhandler");
const AuthRouter = require("./routes/AuthRoutes");

const app = express();

require("dotenv").config();

const PORT = process.env.NODE_ENV || 3200;

mongoose.connect(
	!process.env.NODE_ENV || process.env.NODE_ENV !== "production"
		? process.env.MONGO_URI_LOCAL
		: process.env.MONGO_URI_PROD
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.on("open", () => {
	console.log("DB Connected successfully");
});

app.use(express.json());

app.use("/auth", AuthRouter);
app.use((err, req, res, next) => {
	errorHandler(err, res);
});

app.listen(PORT, () => {
	console.log(`Served:::::::: on PORT:${PORT}`);
});
