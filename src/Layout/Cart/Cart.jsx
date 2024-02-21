import "./Cart.css";
import { useOrder } from "../../context/OrderContext";

const URL = import.meta.env.VITE_SERVER_URL;
export const Cart = () => {
	const { order, cartMenu, total, totalItems } = useOrder();
	console.log(`Order`, order);
	return (
		<div className={`cart-wrapper ${cartMenu ? "active" : ""}`}>
			<div className="list-container">
				<h2>Orden actual:</h2>
				<ul className="order-list">
					{order.map((prod, idx) => {
						return (
							<li className="order-item" key={idx}>
								<img
									className="order-image"
									src={`${URL}/images/users/${prod.image}`}
									alt={prod.productName}
								/>
								{prod.productName}
								<div className="order-quantity">
									{prod.quantity}
									<div className="order-delete-item">
										<i className="fa-solid fa-trash" />
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			</div>

			<div className="order-finish">
				<div className="total">
					<div className="total-count">Items: {totalItems}</div>
					<div className="total-price">
						Total $ <span>{total}</span>
					</div>
				</div>
				<div className="order-purchase">
					<button className="btn">Comprar</button>
				</div>
			</div>
		</div>
	);
};
