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
				{/* <div className="clamp">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Id incidunt at nihil molestias quis modi quidem, voluptatum atque eveniet distinctio quod, cumque hic tempore. Quaerat suscipit sint nobis recusandae, eius quod id, repellendus quos dolores tempore quae facilis similique pariatur.
				</div> */}
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
