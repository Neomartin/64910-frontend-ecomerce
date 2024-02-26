import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import Swal from "sweetalert2";
import axios from "axios";

const URL = import.meta.env.VITE_SERVER_URL;

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
	const { user } = useUser();

	// -SHOW
	const [order, setOrder] = useState(() => JSON.parse(localStorage.getItem("order")) || []);

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
		// console.log(item);

		// // -SHOW

		const itemIndex = order.findIndex((prod) => prod.productId === item._id);
		let newOrder;
		// añadir un elemento a mi order
		if (itemIndex >= 0) {
			newOrder = order.map((producto) => {
				// Devuelvo un nuevo array, solo que checkeo si el item que me enviaron como se que ya existia en mi carrito, si es asi, le sumo 1 a la cantidad
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

		// const totales = order.reduce((total, producto) => {
		// 	total += producto.quantity;
		// 	return total;
		// }, 0);

		let totalItems = 0;
		order.forEach(prod => {
			totalItems += prod.quantity
		})

		setTotalItems(totalItems);
	}

	function calculateTotal() {
		// const totalAcc = order.reduce((acc, producto) => {
		// 	console.log(producto);
		// 	// -SHOW
		// 	acc += producto.price * producto.quantity;
		// 	return acc;
		// }, 0);
		let total = 0;

		order.forEach(prod => {
			total += prod.price * prod.quantity
		})

		setTotal(total);
	}

	async function finishOrder() {
		try {
			
			if(!user) return Swal.fire('Debe loguearse', 'Para finalizar la orden debe estar logueado', 'error');

			const newOrder = {
				userId: user._id,
				total: total,
				products: order
			}

			const response = await axios.post(`${URL}/orders`, newOrder);

			console.log(response.data);

			Swal.fire({
				icon: "success",
				title: "Compra realizada!",
				text: "Gracias por su compra!",
			})

			clearCart();

		} catch (error) {
			console.log(error)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Algo salió mal!",
			})
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
				cartMenu,  // true o false para mostrar el carrito
				total,
				addItem,
				removeItem,
				clearCart,
				toggleMenu,
				totalItems,
				finishOrder
			}}
		>
			{children}
		</OrderContext.Provider>
	);
};
