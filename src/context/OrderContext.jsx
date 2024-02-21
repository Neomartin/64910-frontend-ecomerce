import { createContext, useContext, useEffect, useState } from "react";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
	const [order, setOrder] = useState([]);
	const [cartMenu, setCartMenu] = useState(false);
	const [total, setTotal] = useState(0);
	const [totalItems, setTotalItems] = useState(0);

	useEffect(() => {
		calculateTotalItems();
		calculateTotal();
	}, [order]);
	// addItem
	function addItem(item) {
		console.log(item);

		const itemIndex = order.findIndex((prod) => prod.productId === item._id);
		let newOrder;
		// añadir un elemento a mi order
		if (itemIndex >= 0) {
			newOrder = order.map((producto) => {
				if (producto.productId === item._id) {
					return { ...producto, quantity: producto.quantity + 1 };
				}

				return producto;
			});
		} else {
			const product = {
				productId: item._id,
				quantity: 1,
				price: item.age,
				productName: item.name,
				image: item.image,
			};
			newOrder = [...order, product];
		}

		setOrder(newOrder);
	}

	function calculateTotalItems() {
		const totales = order.reduce((total, producto) => {
			total += producto.quantity;
			return total;
		}, 0);

		setTotalItems(totales);
	}

	function calculateTotal() {
		const totalAcc = order.reduce((acc, producto) => {
			console.log(producto);
			// -SHOW
			acc += producto.price * producto.quantity;
			return acc;
		}, 0);

		setTotal(totalAcc);
	}

	// removeItem
	function removeItem(id) {
		// Debo buscar en el array order ese item y eliminarlo y actualizar el estado de orders
	}

	// clearCart
	function clearCart() {
		// Limpio mi carrito de compras
		setOrder([]);
	}

	// toggleMenu
	function toggleMenu() {
		console.log(cartMenu);
		setCartMenu(!cartMenu);
	}

	return (
		<OrderContext.Provider
			value={{
				order,
				cartMenu,
				total,
				addItem,
				removeItem,
				clearCart,
				toggleMenu,
				totalItems,
			}}
		>
			{children}
		</OrderContext.Provider>
	);
};
