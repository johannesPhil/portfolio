const mongoose = require("mongoose");
const { Schema } = mongoose;

const { isEmail } = require("validator");

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please specify a name"],
    },
    email: {
        type: String,
        required: [true, "Specify a mail address"],
        validate: [isEmail, "Invalid Email"],
    },
    password: {
        type: String,
        required: [true],
    },
});

const User = mongoose.model("User", userSchema);

export default User;
