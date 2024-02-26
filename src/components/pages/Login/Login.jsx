import "./Login.css";
import { useUser } from "@/context/UserContext";

export default function Login() {
	const { login } = useUser();
	function handleSubmit(event) {
		event.preventDefault();
		const el = event.target.elements;

		const data = {
			email: el.email.value,
			password: el.password.value,
		};

		login(data);
		/* {
      email: user@gmail.com
      password: alfa
    } */
	}

	return (
		<div className="login-container">
			<div className="wave"></div>
			<div className="wave"></div>
			<div className="wave"></div>
			<form className="login-form" onSubmit={handleSubmit}>
				<h1>Ingresar</h1>
				<label>Correo electrónico</label>
				<input
					name="email"
					required
					type="text"
					placeholder="Correo electrónico"
				/>

				<label>Contraseña</label>
				<input
					name="password"
					required
					type="password"
					placeholder="Contraseña"
				/>

				<button type="submit" className="button">
					Ingresar
				</button>
			</form>
		</div>
	);
}
