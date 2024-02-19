import { NavLink } from "react-router-dom";
import "./Header.css";
import { useUser } from "@/context/UserContext";
import { useOrder } from "@/context/OrderContext";
const URL = import.meta.env.VITE_SERVER_URL;

export default function Header() {
	const test = useOrder();
		console.log(test)
	const { user, logout } = useUser();

	const isAdmin = user?.role === "ADMIN_ROLE"

	// const avaibleLinks = LINKS.filter(link => isAdmin || !link.admin)
	// - TODO REMOVER

	return (
		<header className="header">
			<nav>
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

			{/* {
                avaibleLinks.map(link => (
                    <NavLink key={link.path} className="nav-link" to={link.path} >{link.text}</NavLink>
                ))
            } */}
			</nav>
			
			<div className="user-info">
				{ user ? (
					<>
						<i className="cart fa-solid fa-cart-shopping" onClick={() => toggleMenu()}></i>
						<span className="user-avatar">
							<img src={`${URL}/images/users/${user.image}`} alt={user.name} />
						</span>
						<i className="fa-solid fa-arrow-right-from-bracket" title="Desloguearse" onClick={() => logout()}></i>
					</>
				) : (
					<NavLink to="/login" className="nav-link">
						Login
					</NavLink>
				)}

				
			</div>

		</header>
	);
}
