const express = require("express");
const app = express();
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

app.post("/createUser", async (req, res) => {
	if (!req.body.username || !req.body.password) {
		return res.redirect("/invalid/register");
	}
	if (await userModel.findOne({ username: req.body.username })) {
		return res.redirect("/invalid/register");
	}
	req.body.password = jwt.sign(
		{ password: req.body.password },
		process.env.PASSWORD_SECRET
	);
	await userModel.create(req.body);
	res.redirect("/login");
});

app.post("/login", async (req, res) => {
	if (!req.body.username || !req.body.password) {
		return res.redirect("/invalid/login");
	}

	const user = await userModel.findOne({ username: req.body.username });
	if (!user) {
		return res.redirect("/invalid/login");
	}

	try {
		const password = jwt.verify(user.password, process.env.PASSWORD_SECRET);
		if (req.body.password !== password.password) {
			return res.redirect("/invalid/login");
		}
	} catch {
		return res.redirect("/invalid/login");
	}

	res
		.cookie(
			"token",
			jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
				expiresIn: "1d",
			})
		)
		.redirect("/cart");
});

app.get("/register", (req, res, next) => {
	if (req.cookies.token) {
		try {
			jwt.verify(req.cookies.token, process.env.JWT_SECRET);
			return res.redirect("/cart");
		} catch {
			return next();
		}
	}
	next();
});

app.get("/login", (req, res, next) => {
	if (req.cookies.token) {
		try {
			jwt.verify(req.cookies.token, process.env.JWT_SECRET);
			return res.redirect("/cart");
		} catch {
			return next();
		}
	}
	next();
});

app.get("/cart", async (req, res, next) => {
	if (req.cookies.token) {
		try {
			const username = jwt.verify(
				req.cookies.token,
				process.env.JWT_SECRET
			).username;
			const user = await userModel.findOne({ username });
			req.cart = user.cart;
			return next();
		} catch {
			return res.redirect("/login");
		}
	}
	res.redirect("/login");
});

app.post("/cartAdd", async (req, res, next) => {
	if (req.cookies.token) {
		try {
			const username = jwt.verify(
				req.cookies.token,
				process.env.JWT_SECRET
			).username;
			const user = await userModel.findOne({ username });
			user.cart.set(req.body.item, user.cart.get(req.body.item) + 1 || 1);
			await userModel.findOneAndUpdate({ username }, user);
			return next();
		} catch {
			return res.redirect("/login");
		}
	}
	res.redirect("/login");
});

app.post("/cartRemove", async (req, res, next) => {
	if (req.cookies.token) {
		try {
			const username = jwt.verify(
				req.cookies.token,
				process.env.JWT_SECRET
			).username;
			const user = await userModel.findOne({ username });
			if (!user.cart.get(req.body.item)) return next();
			user.cart.set(req.body.item, user.cart.get(req.body.item) - 1);
			if (!user.cart.get(req.body.item)) {
				user.cart.delete(req.body.item);
			}
			await userModel.findOneAndUpdate({ username }, user);
			return next();
		} catch {
			return res.redirect("/login");
		}
	}
	res.redirect("/login");
});

app.get("/", async (req, res, next) => {
	if (req.cookies.token) {
		try {
			const username = jwt.verify(
				req.cookies.token,
				process.env.JWT_SECRET
			).username;
			const user = await userModel.findOne({ username });
			req.cartLength = user.cart.length;
		} catch {
			return next();
		}
	}
	next();
});

app.post("/logout", (req, res) => {
	res.clearCookie("token").redirect("/");
});

module.exports = app;
