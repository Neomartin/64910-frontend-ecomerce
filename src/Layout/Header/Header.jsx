import { NavLink } from "react-router-dom";
import "./Header.css";
import { useOrder } from "@/context/OrderContext";
import { useUser } from "@/context/UserContext";

const URL = import.meta.env.VITE_SERVER_URL;

export default function Header() {
	const { toggleMenu, totalItems } = useOrder();
	const { user, logout, admin } = useUser();

	return (
		<header className="header">
			<nav className="nav-list">
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

				{!user && (
					<NavLink to="/register" className="nav-link">
						Registro
					</NavLink>
				)}

				{admin && (
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
				{user ? (
					<>
						<div className="icon-container">
							<i
								data-count={totalItems}
								className="cart-icon fa-solid fa-cart-shopping"
								onClick={() => toggleMenu()}
							></i>
						</div>
						<span className="user-avatar">
							<img src={`${URL}/images/users/${user.image}`} alt={user.name} />
						</span>
						<i
							data-count={totalItems}
							className="pointer fa-solid fa-arrow-right-from-bracket"
							onClick={() => logout()}
						></i>
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
