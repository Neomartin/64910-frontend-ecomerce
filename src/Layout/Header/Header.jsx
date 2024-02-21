import { NavLink } from "react-router-dom";
import "./Header.css";
import { useOrder } from "@/context/OrderContext";
import { useUser } from "@/context/UserContext";

export default function Header() {
	const { toggleMenu, totalItems } = useOrder();
	const { user, logout, admin } = useUser();

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
						<div>{user.name}</div>
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
			{/* {
                avaibleLinks.map(link => (
                    <NavLink key={link.path} className="nav-link" to={link.path} >{link.text}</NavLink>
                ))
            } */}
		</header>
	);
}
