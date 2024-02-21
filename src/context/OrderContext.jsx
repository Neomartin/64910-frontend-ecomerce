import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import Swal from "sweetalert2";
import axios from "axios";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
	const { user } = useUser();
	// -SHOW
	const [order, setOrder] = useState(
		() => JSON.parse(localStorage.getItem("order")) || [],
	);
	const [cartMenu, setCartMenu] = useState(false);
	const [total, setTotal] = useState(0);
	const [totalItems, setTotalItems] = useState(0);

	useEffect(() => {
		// -SHOW
		calculateTotalItems();
		calculateTotal();
	}, [order]);
	// addItem
	function addItem(item) {
		console.log(item);

		// -SHOW
		if (!user)
			return Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Debes iniciar sesión para agregar productos al carrito",
			});
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

		localStorage.setItem("order", JSON.stringify(newOrder));
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

	async function finishOrder() {
		if (!user)
			return Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Debes iniciar sesión para finalizar la compra",
			});

		const { _id: userId } = user;
		const products = order.map((prod) => {
			return {
				productId: prod.productId,
				quantity: prod.quantity,
				price: prod.price,
			};
		});

		const newOrder = {
			userId,
			products,
			total,
		};

		const response = await axios.post(`${URL}/orders`, newOrder);

		if (response.status === 201) {
			Swal.fire({
				icon: "success",
				title: "Compra realizada",
				text: "Gracias por tu compra",
			});
			clearCart();
		}
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
		// !Si no tengo user no mostrar menu
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
				finishOrder,
			}}
		>
			{children}
		</OrderContext.Provider>
	);
};
