import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Nav() {
	return (
		<nav className={styles.nav}>
			<h1 className={styles.logo}>Blare</h1>
			<a href="/">Home</a>
			<a href="/cart">Cart</a>
		</nav>
	);
}
