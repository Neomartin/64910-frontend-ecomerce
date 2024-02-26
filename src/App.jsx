import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home/Home";
import Contact from "./components/pages/Contact/Contact";
import Register from "./components/pages/Register/Register";
import AboutUs from "./components/pages/AboutUs/AboutUs";
import Login from "./components/pages/Login/Login";
import Footer from "./components/layout/Footer/Footer";
import AdminProduct from "./components/pages/AdminProduct/AdminProduct";
import AdminRoute from "./services/guard/AdminRoute/AdminRoute";
import AdminUser from "./components/pages/AdminUser/AdminUser";
import { Cart } from "./components/layout/Cart/Cart";
import { ProductDetail } from "./components/pages/ProductDetail/ProductDetail";
import { Order } from "./components/pages/Order/Order";
import Header from "./components/layout/Header/Header";

function App() {
	return (
		<>
			<Header />
			<Cart />
			<main className="main">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/about-us" element={<AboutUs />} />

					<Route path="/login" element={<Login />} />
					<Route path="/orders" element={ <Order /> } />
					<Route path="/product-detail/:id" element={ <ProductDetail /> } />

					<Route path="/register" element={<Register />} />

					{/* Rutas protegidas con el Guard AdminRoute */}
					<Route
						path="/admin-product"
						element={
							<AdminRoute>
								<AdminProduct />
							</AdminRoute>
						}
					/>
					<Route
						path="/admin-user"
						element={
							<AdminRoute>
								<AdminUser />
							</AdminRoute>
						}
					/>
				</Routes>
			</main>

			<Footer />
		</>
	);
}

export default App;
