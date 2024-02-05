import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { UserTable } from "../../components/UserTable/UserTable";
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_SERVER_URL;

// Defino variable global para mi componente para user el TOKEN en distintas peticiones
const TOKEN = localStorage.getItem("token");

const AdminUser = () => {
	const [dbUsers, setDbUsers] = useState([]);
	const [categories, setCategories] = useState([]);
	// const [isFormEdit, setIsFormEdit] = useState(false);
	const [userId, setUserId] = useState();
	const navigate = useNavigate();

	// -Obtener usuarios
	async function getUsers() {
		try {
			const response = await axios.get(`${URL}/users`);
			const users = response.data.users;
			console.log(`Bucle`);
			setDbUsers(users);
		} catch (error) {
			console.log(error);
			Swal.fire({
				title: "No se pudieron obtener los Usuarios",
				icon: "error",
			});
		}
	}

	async function deleteUser(id) {
		Swal.fire({
			title: `Confirma borrar este usuario?`,
			text: `Realmente desea borrar el usuario ${id}`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Borrar",
			cancelButtonText: `Cancelar`,
			confirmButtonColor: "#d33",
			reverseButtons: true,
		}).then(async function (resultado) {
			if (resultado.isConfirmed) {
				try {
					if (!TOKEN) return;
					// Borrar el usuario en la base de datos
					console.log(`Usuario a borrar ${id}`);

					// Borrar el usuario de la base de datos
					await axios.delete(`${URL}/users/${id}`, {
						headers: { authorization: TOKEN },
					});

					Swal.fire({
						title: `Usuario Borrado`,
						text: `El user ${id} fue borrado correctamente`,
						icon: "success",
						timer: 1500,
					});
					// Actualizar el estado de mi dbUsers para que se vuelva a pintar sin el user borrado
					getUsers();
				} catch (error) {
					console.log(error.response.status);
					Swal.fire("Error al borrar", "No se pudo borrar el usuario", "error");
					if (error.response.status === 401) return logout();
				}
			}
		});

		// const users =
		// Debo actualizar el estado de mis usuarios quitando el user que se BORRO
	}

	function logout() {
		// logout()
		localStorage.removeItem("currentUser");
		localStorage.removeItem("token");
		navigate("/");
	}

	useEffect(
		function () {
			getUsers();
			getCategories();
		}, //	Funcion que se ejecuta cuando se monta el componente
		[],
	);

	async function getCategories() {
		try {
			const response = await axios.get(`${URL}/categories`);
			const categoriesDB = response.data.categories;

			//	Setear un estado que maneje las categorias
			setCategories(categoriesDB);
		} catch (error) {
			console.log("No se pudieron obtener las categorias");
		}
	}

	const { register, handleSubmit, setValue } = useForm();

	// Obtener data del formulario y hacer un POST o un PUT
	async function handleSubmitTo(e) {
		// e.preventDefault();

		const formData = new FormData(); // Create a FormData object

		for (const [key, value] of Object.entries(e)) {
			console.log(key);
			if (key === "image") {
				formData.append(key, value[0]);
				break;
			}
			formData.append(key, value);
		}

		console.log("No continua");
		// Append all form values to the FormData object
		// formData.append("name", e.target.name.value);
		// formData.append("email", e.target.email.value);
		// formData.append("password", e.target.password.value);
		// formData.append("age", e.target.age.value);
		// formData.append("location", e.target.location.value);

		// if (e.target.image.files[0]) {
		// 	formData.append("image", e.target.image.files[0]);
		// }
		for (const [key, value] of formData) {
			console.log(key, value);
		}

		try {
			/* Vamos a definir si tenemos que hacer un 
					POST: añadir usuario
					PUT: vamos a editar un usuario
			*/

			// data.image = data.image[0];

			if (userId) {
				if (!TOKEN) return;
				// ME FALTA AÑADIR EL
				const response = await axios.put(`${URL}/users/${userId}`, formData, {
					headers: {
						authorization: TOKEN,
					},
				});

				Swal.fire({
					title: "Usuario Editado Correctamente",
					text: `El usuario ${response.data.user.name} fue editado correctamente`,
					icon: "success",
				});
				getUsers();
				setUserId(null);
				// Hago un return para que mi código que sigue luego del if no se ejecute
				return;
			}

			const response = await axios.post(`${URL}/users`, formData);
			console.log(response.data);
			Swal.fire({
				title: "Usuario Creado",
				text: `El usuario ${response.data.user.name} fue creado correctamente`,
				icon: "success",
			});
			getUsers();
			setFormValue();
		} catch (error) {
			console.log(error);
			Swal.fire({
				icon: "error",
				title: "No se creo usuario",
				text: "Alguno de los datos ingresados no es correcto",
			});
			if (error.response.status === 401) return logout();
		}
	}

	function setFormValue(user) {
		setUserId(user?._id || null);

		setValue("name", user?.name || "");
		setValue("email", user?.email || "");

		setValue("age", user?.age || "");
		setValue("image", user?.category._id || "");
	}

	return (
		<div className="admin-dashboard">
			<div className="form-container">
				{/* Formulario de carga de productos */}
				<div className="form-sticky">
					<h2 className="admin-form-title">
						Registro de Usuarios
						{userId && (
							<button className="btn btn-delete" onClick={() => setFormValue()}>
								<i className="fa-solid fa-xmark"></i>
							</button>
						)}
					</h2>

					<form
						className="admin-form"
						onSubmit={handleSubmit(handleSubmitTo)}
						encType="multipart/form-data"
					>
						<div className="input-group">
							<label htmlFor="product">Nombre Completo</label>
							<input
								type="text"
								id="product"
								className="admin-input"
								{...register("name", {
									required: true,
									minlength: 3,
									maxlength: 100,
								})}
							/>
						</div>
						<div className="input-group">
							<label htmlFor="">Email</label>
							<input
								type="email"
								className="admin-input"
								{...register("email", { required: true })}
							/>
						</div>
						<div className="input-group">
							<label htmlFor="">Contraseña</label>
							<input
								type="password"
								className="admin-input"
								disabled={userId}
								{...register("password", { required: true })}
							/>
						</div>
						<div className="input-group">
							<label htmlFor="">Edad</label>
							<input type="number" {...register("age")} />
						</div>
						<div className="input-group">
							<label htmlFor="">Imagen</label>
							<input
								type="file"
								className="admin-input"
								{...register("image")}
							/>
						</div>

						<div className="input-group">
							<label htmlFor="location">Seleccione Cateroria</label>
							<select id="location" {...register("location")}>
								{categories.map((category) => (
									<option key={category._id} value={category.name}>
										{category.name}
									</option>
								))}
							</select>
						</div>

						<div className="input-group">
							<button type="submit" className={userId ? "btn-success" : ""}>
								{userId ? "Editar usuario" : "Añadir Usuario"}
							</button>
						</div>
					</form>
				</div>
			</div>

			<div className="table-container">
				{/* Tabla con mis productos para manejar el CRUD de los mismos */}
				<h2>Tabla de productos</h2>
				<UserTable
					users={dbUsers}
					deleteUser={deleteUser}
					setFormValue={setFormValue}
				/>
			</div>
		</div>
	);
};

export default AdminUser;
