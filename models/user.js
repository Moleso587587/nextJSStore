const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Must Provide username"],
	},
	password: {
		type: String,
		required: [true, "Must Provide password"],
	},
});

module.exports = mongoose.model("User", UserSchema);
