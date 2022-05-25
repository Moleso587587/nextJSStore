const express = require("express");
const next = require("next");

const dev = true;
const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();
	server.get("*", (req, res) => {
		return handle(req, res);
	});
	server.post("/createUser", (req, res) => {
		res.send(req.body);
	});
	server.listen(1000, (err) => {
		if (err) {
			throw err;
		} else {
			console.log("Server started at port 1000");
		}
	});
});
