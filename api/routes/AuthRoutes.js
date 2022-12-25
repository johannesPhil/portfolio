const express = require("express");
const { ServerErrorHandler } = require("../Middlewares/errorhandler");
const {
	validatePayload,
} = require("../Controllers/Auth/RegistrationController");
const User = require("../Models/User");
const bcrypt = require("bcrypt");

const AuthRouter = express.Router();
const saltRounds = 10;

AuthRouter.post("/register", validatePayload, async (req, res, next) => {
	let userData = {};
	const { name, email, password } = req.body;
	bcrypt.hash(password, saltRounds, (err, hash) => {
		if (hash) {
			userData.name = name;
			userData.email = email;
			userData.password = hash;

			const newUser = new User(userData);

			newUser
				.save()
				.then((user) =>
					res.json({ message: "Registration Successful", user })
				)
				.catch((error) => {
					console.log(error);
					throw new ServerErrorHandler(
						500,
						"Something went wrong. Please try again"
					);
				});
		} else {
			console.log(err);
			throw new ServerErrorHandler(
				500,
				"Something went wrong. Please try again"
			);
		}
	});
});

module.exports = AuthRouter;
