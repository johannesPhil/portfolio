const mongoose = require("mongoose");
const { Schema } = mongoose;

const validator = require("validator");

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Please specify a name"],
		},
		email: {
			type: String,
			required: [true, "Specify a mail address"],
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			select: false,
		},
	},
	{
		toJSON: {
			transform(doc, ret) {
				delete ret.password;
				delete ret.__v;
			},
		},
	}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
