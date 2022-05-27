import React from "react";
import styles from "../styles/Home.module.css";

export default function login() {
	return (
		<form action="/login" method="post" className={styles.login}>
			<h1>Login</h1>
			<input type="text" name="username" placeholder="Username" />
			<input type="password" name="password" placeholder="Password" />
			<button type="submit">Submit</button>
			<a href="/register">Register</a>
		</form>
	);
}
