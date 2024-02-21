import axios from "axios";
import { useEffect, useState } from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import "./ProductCardsContainer.css";

const URL = import.meta.env.VITE_SERVER_URL;

export const ProductCardsContainer = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		getProducts();
	}, []);

	async function getProducts() {
		try {
			const response = await axios.get(`${URL}/users`);

			const productsDB = response.data.users;

			setProducts(productsDB);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="product-container">
			{products.map((product) => {
				return <ProductCard key={product._id} product={product} />;
			})}
		</div>
	);
};
