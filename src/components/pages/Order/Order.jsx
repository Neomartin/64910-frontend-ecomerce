import { useEffect } from "react";
import api from "@/services/interceptor";

export const Order = () => {
	console.log(`Order component`)
	useEffect(() => {
		getOrders();
	}, []);

	async function getOrders() {
		try {
			
			const response = await api.get(`/orders`);
			console.log(`Ordenes obtenidas`, response.data);

		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<h2>Ordenes</h2>
		</>
	);
};
