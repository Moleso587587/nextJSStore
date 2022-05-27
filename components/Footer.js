import styles from "../styles/Home.module.css";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<p>
				This website was created by Maverick Oleson for display purposes. Any
				images used are not under the ownership of Maverick Oleson and source
				the url of origin.
			</p>
			<div>
				<a href="/">
					<h1>Home</h1>
				</a>
			</div>
			<div>
				<a href="/cart">
					<h1>Cart</h1>
				</a>
			</div>
			<div>
				<a href="/login">
					<h1>Login</h1>
				</a>
			</div>
			<div>
				<a href="/register">
					<h1>Register</h1>
				</a>
			</div>
		</footer>
	);
}
