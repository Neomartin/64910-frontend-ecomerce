import { NavLink } from "react-router-dom";
import "./Header.css";
import { useOrder } from "@/context/OrderContext";
import { useUser } from "@/context/UserContext";

const URL = import.meta.env.VITE_SERVER_URL;

const Header = () => {
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

				{user ? <NavLink to="/orders" className="nav-link">
							Ordenes
						</NavLink> : (
					<>
						<NavLink to="/register" className="nav-link">
							Registro
						</NavLink>
					</>
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
								data-count={ totalItems }
								className="cart-icon fa-solid fa-cart-shopping"
								onClick={() => toggleMenu()}
							></i>
						</div>
						<div className="dropdown-menu user-avatar">
							<img src={`${URL}/images/users/${user.image}`} alt={user.name} />
							<div className="dropdown-links">
								<NavLink to="/orders" className="nav-link">
									<i className="fa-solid fa-dolly"></i>
									Ordenes
								</NavLink>
								<a className="nav-link" onClick={() => logout()}>
									<i className="pointer fa-solid fa-arrow-right-from-bracket"></i>{" "}
									Logout
								</a>
							</div>
						</div>
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

export default Header;