import React from "react";
import styles from "../styles/Home.module.css";

export default function register() {
	return (
		<form action="/createUser" method="post" className={styles.login}>
			<h1>Register</h1>
			<input type="text" name="username" placeholder="Username" />
			<input type="password" name="password" placeholder="Password" />
			<button type="submit">Submit</button>
			<a href="/login">Login</a>
		</form>
	);
}
