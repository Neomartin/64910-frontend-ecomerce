import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_SERVER_URL;
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("currentUser"))
	);
	const [token, setToken] = useState(() => localStorage.getItem("token"));
	const [admin, setAdmin] = useState(
		() =>
			JSON.parse(localStorage.getItem("currentUser"))?.role === "ADMIN_ROLE",
	);
	const navigate = useNavigate();

	const login = async (loginData) => {
		try {
			const response = await axios.post(`${URL}/login`, loginData);

			const { user, token } = response.data;

			localStorage.setItem("currentUser", JSON.stringify(user));
			localStorage.setItem("token", token);

			setUser(user);
			setAdmin(user.role === "ADMIN_ROLE")
			setToken(token);
			if (user.role === "ADMIN_ROLE") {
				setAdmin(true);
			}
			Swal.fire({
				title: "Login correcto",
				text: "Sera redireccionado en breve",
				icon: "success",
				timer: 1500,
			}).then(() => {
				navigate("/");
			});
		} catch (error) {
			console.log(error);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Usuario o contraseña incorrectos",
			});
		}
	};

	const logout = () => {
		localStorage.removeItem("currentUser");
		localStorage.removeItem("token");
		setUser(null);
		setToken(null);
		setAdmin(false);
		navigate("/");
	};

	return (
		<UserContext.Provider value={{ user, login, logout, token, admin }}>
			{children}
		</UserContext.Provider>
	);
};
