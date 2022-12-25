class ErrorHandler extends Error {
	constructor(statusCode, message, type) {
		super();
		this.statusCode = statusCode;
		this.message = message;
		this.type = type;
	}
}

class RegistrationErrorHandler extends ErrorHandler {}
class ServerErrorHandler extends ErrorHandler {}
class AuthError extends ErrorHandler {}

const errorHandler = (err, res) => {
	return res.status(err.statusCode).json(err);
};

module.exports = {
	ErrorHandler,
	RegistrationErrorHandler,
	ServerErrorHandler,
	AuthError,
	errorHandler,
};
