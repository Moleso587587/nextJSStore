import React, { useContext, useReducer, useState } from "react";
import ItemsContext from "../contexts/ItemsContext";
import styles from "../styles/Home.module.css";

export default function cart({ cartJSON }) {
	const items = useContext(ItemsContext);
	const [yourCart, setCart] = useReducer((state, action) => {
		if (action.type === "add")
			state = { ...state, [action.item]: state[action.item] + 1 };
		if (action.type === "remove")
			state = { ...state, [action.item]: state[action.item] - 1 };
		if (!state[action.item]) delete state[action.item];
		return state;
	}, JSON.parse(cartJSON));
	return (
		<>
			<form action="/logout" method="post">
				<button type="submit" className={styles.button}>
					Logout
				</button>
			</form>
			{Object.keys(yourCart).length ? (
				<div className={styles.grid}>
					{Object.keys(items).map((item, i) => {
						if (Object.keys(yourCart).includes(item)) {
							return (
								<a key={i} className={styles.gridItem}>
									<img src={items[item].image} />
									<h3>{item}</h3>
									<p>{items[item].cost}$</p>
									<h3>{yourCart[item]}</h3>
									<div className={styles.addRem}>
										<h1
											onClick={async (e) => {
												await fetch("/cartRemove", {
													headers: {
														Accept: "application/json",
														"Content-Type": "application/json",
													},
													method: "POST",
													body: JSON.stringify({ item }),
												});
												setCart({ type: "remove", item });
											}}
										>
											-
										</h1>
										<h1
											onClick={async (e) => {
												await fetch("/cartAdd", {
													headers: {
														Accept: "application/json",
														"Content-Type": "application/json",
													},
													method: "POST",
													body: JSON.stringify({ item }),
												});
												setCart({ type: "add", item });
											}}
										>
											+
										</h1>
									</div>
								</a>
							);
						}
					})}
				</div>
			) : (
				<h1>No Items in Cart</h1>
			)}
		</>
	);
}

export function getServerSideProps(context) {
	return {
		props: { cartJSON: JSON.stringify(context.req.cart) || {} },
	};
}
