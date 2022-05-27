import "../styles/globals.css";
import Nav from "../components/Nav";
import ItemsContext from "../contexts/ItemsContext";
import Footer from "../components/Footer";

export default function MyApp({ Component, pageProps }) {
	const items = {
		"Korg Minilogue": {
			image:
				"https://cdn.korg.com/my/products/upload/506f8924bc035062f14a528fdd3ee19c_sp.png",

			cost: 550,
		},
		"Arturia Microfreak": {
			image:
				"https://media.guitarcenter.com/is/image/MMGS7/L48209000000000-00-720x720.jpg",
			cost: 350,
		},
		"Focusrite Scarlett Gen 3": {
			image:
				"https://media.guitarcenter.com/is/image/MMGS7/L56573000000000-00-720x720.jpg",

			cost: 120,
		},
		"0.25in male patch cables": {
			image:
				"https://media.guitarcenter.com/is/image/MMGS7/J01823000001000-00-720x720.jpg",
			cost: 10,
		},
		"Audio-Technica AT2020": {
			image:
				"https://media.guitarcenter.com/is/image/MMGS7/270620000000000-00-720x720.jpg",
			cost: 110,
		},
		Minimoog: {
			image:
				"https://images.reverb.com/image/upload/s--miDs1-zI--/f_auto,t_supersize/v1644946136/voky0sngugxwyutj3m3w.jpg",

			cost: 15000,
		},
	};
	return (
		<ItemsContext.Provider value={items}>
			<Nav />
			<Component {...pageProps} />
			<Footer />
		</ItemsContext.Provider>
	);
}
