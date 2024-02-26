import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Register from "./pages/Register/Register";
import AboutUs from "./pages/AboutUs/AboutUs";
import Login from "./pages/Login/Login";
import Footer from "./components/layout/Footer/Footer";
import AdminProduct from "./pages/AdminProduct/AdminProduct";
import AdminRoute from "./guard/AdminRoute/AdminRoute";
import AdminUser from "./pages/AdminUser/AdminUser";
import { Cart } from "./components/layout/Cart/Cart";
import { ProductDetail } from "./pages/ProductDetail/ProductDetail";
import { Order } from "./pages/Order/Order";
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
