import { useOrder } from "@/context/OrderContext";
import productDefault from "../../assets/images/default-product.png";
import "./ProductCard.css";
import { Link } from "react-router-dom";

const URL = import.meta.env.VITE_SERVER_URL;

export const ProductCard = ({ product }) => {
	console.log(product);
	const { addItem } = useOrder();

	return (
		<div className="card">
			<div className="card-header">
				<img
					src={
						product.image
							? `${URL}/images/users/${product.image}`
							: productDefault
					}
					alt={product.name}
				/>
			</div>
			<div className="card-body">
				<small>{product.location}</small>
				<h2>{product.name}</h2>
				<p className="product-price">${product.age}</p>
				<p className="product-date">{product.email}</p>
			</div>
			<div className="card-footer">
				<Link className="btn transparent" to={`/product-detail/${product._id}`}>
					Ver mas
				</Link>
				<button className="btn" onClick={() => addItem(product)}>
					Comprar
				</button>
			</div>
		</div>
	);
};
