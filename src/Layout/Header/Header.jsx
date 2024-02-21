import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { useOrder } from "@/context/OrderContext";
// import LINKS from '../../LINKS';

export default function Header() {
	const { toggleMenu, totalItems } = useOrder();
	const navigate = useNavigate();
	const isAdmin = true;
	const user = {
		name: "John Doe",
	};
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	// const avaibleLinks = LINKS.filter(link => isAdmin || !link.admin)
	function logout() {
		localStorage.removeItem("currentUser");
		localStorage.removeItem("token");
		navigate("/");
	}

	return (
		<header className="header">
			<NavLink
				to="/"
				className={({ isActive }) =>
					isActive ? "nav-link active" : "nav-link"
				}
			>
				Principal
			</NavLink>
			<NavLink to="/contact" className="nav-link">
				Contacto
			</NavLink>
			<NavLink to="/about-us" className="nav-link">
				Acerca de
			</NavLink>
			<NavLink to="/register" className="nav-link">
				Registro
			</NavLink>

			{currentUser ? (
				<button className="nav-link" onClick={() => logout()}>
					Logout
				</button>
			) : (
				<NavLink to="/login" className="nav-link">
					Login
				</NavLink>
			)}

			{isAdmin && (
				<>
					<NavLink to="/admin-product" className="nav-link">
						Admin Product
					</NavLink>
					<NavLink to="/admin-user" className="nav-link">
						Admin user
					</NavLink>
				</>
			)}

			<div className="user-info">
				{user && (
					<>
						<div>{user.name}</div>
						<div className="icon-container">
							<i
								data-count={totalItems}
								className="cart-icon fa-solid fa-cart-shopping"
								onClick={() => toggleMenu()}
							></i>
						</div>
					</>
				)}
			</div>
			{/* {
                avaibleLinks.map(link => (
                    <NavLink key={link.path} className="nav-link" to={link.path} >{link.text}</NavLink>
                ))
            } */}
		</header>
	);
}
