const { RegistrationErrorHandler } = require("../../Middlewares/errorhandler");
const validator = require("validator");
const User = require("../../Models/User");
const e = require("express");

const validatePayload = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;
		if (
			validator.isEmpty(name) ||
			validator.isEmpty(email) ||
			validator.isEmpty(password)
		) {
			throw new RegistrationErrorHandler(
				400,
				"Please fill all fields",
				"Input Error"
			);
		}

		if (!validator.isEmail(email)) {
			throw new RegistrationErrorHandler(
				400,
				"Invalid email address",
				"Input Error"
			);
		}

		if (!validator.isLength(password, { min: 4 })) {
			throw new RegistrationErrorHandler(
				400,
				"Password requires a minimum of 4 characters",
				"Input Error"
			);
		}

		const existingUser = await User.exists({ email });
		if (existingUser) {
			throw new RegistrationErrorHandler(
				400,
				`User with email ${email} already exists`,
				"Input Error"
			);
		}

		next();
	} catch (error) {
		next(error);
	}
};

module.exports = {
	validatePayload,
};
