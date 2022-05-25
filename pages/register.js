import React from "react";

export default function register() {
	return (
		<form action="/createUser" method="post">
			<input type="text" name="username" placeholder="Username" />
			<input type="text" name="password" placeholder="Password" />
			<button type="submit">Submit</button>
		</form>
	);
}
