import axios from "axios";
import { useEffect, useState } from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import "./ProductCardsContainer.css";

export const ProductCardsContainer = () => {
	const [products, setProducts] = useState([]);
	console.log(products);

	useEffect(
		function () {
			//  Codigo que se ejecuta cuando se monta el componente
			console.log("Se monto el componente");
			getProducts();
		},
		[],
	);

	async function getProducts() {
		try {
			//  Pedido al backend de los usuarios para luego pintarlos
			const response = await axios.get("http://localhost:3000/users");

			setProducts(response.data.users);

			console.log(response);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<h1>Lista de Productos</h1>
			<div className="product-container">
				{products.map((user) => {
					return (
						// Llamar al componente ProductCard
						<ProductCard user={user} key={user._id} />
					);
				})}
			</div>
		</>
	);
};
