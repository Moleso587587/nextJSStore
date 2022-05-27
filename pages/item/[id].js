import React, { useContext } from "react";
import ItemsContext from "../../contexts/ItemsContext";
import Head from "next/head";
import styles from "../../styles/Home.module.css";

export default function itemId({ item }) {
	const items = useContext(ItemsContext);
	if (Object.keys(items).includes(item))
		return (
			<div className={styles.item}>
				<h1>{item}</h1>
				<img src={items[item].image} />
				<h3>{items[item].cost}$</h3>
				<button
					className={styles.button}
					onClick={async (e) => {
						await fetch("/cartAdd", {
							headers: {
								Accept: "application/json",
								"Content-Type": "application/json",
							},
							method: "POST",
							body: JSON.stringify({ item }),
						});
					}}
				>
					Add to cart
				</button>
			</div>
		);
	else {
		return <h1>Could not find item</h1>;
	}
}

export function getServerSideProps(context) {
	return {
		props: { item: context.params.id },
	};
}
