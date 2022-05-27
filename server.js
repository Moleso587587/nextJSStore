const express = require("express");
const next = require("next");
const cookieParser = require("cookie-parser");
const routes = [require("./apiroutes/userRoutes")];
const connectDB = require("./connectDB");
require("dotenv").config();

const dev = true;
const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(async () => {
	const server = express();
	server.use(express.json());
	server.use(express.urlencoded({ extended: true }));
	server.use(cookieParser());
	server.use(routes);
	server.get("*", (req, res) => {
		return handle(req, res);
	});
	await connectDB(process.env.MONGO_URI);
	server.listen(1000, (err) => {
		if (err) {
			throw err;
		} else {
			console.log("Server started at port 1000");
		}
	});
});
