import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { UserTable } from "../../components/UserTable/UserTable";
import RegisterForm from "@/components/RegisterForm/RegisterForm";
import './AdminUser.css';

const URL = import.meta.env.VITE_SERVER_URL;

const AdminUser = () => {
	
	const [dbUsers, setDbUsers] = useState([]);
	const [userId, setUserId] = useState();
	const [formValue, setFormValue] = useState();
	// const [isFormEdit, setIsFormEdit] = useState(false);
	
	const [totalButtons, setTotalButtons] = useState([]);
	const [limit, setLimit] = useState(2);

	// -Obtener usuarios
	async function getUsers(page = 0) {
		try {
			const response = await axios.get(
				`${URL}/users?page=${page}&limit=${limit}`,
			);
			const users = response.data.users;
			const total = response.data.total;

			const buttonsQuantity = Math.ceil(total / limit);

			const arrayButtons = [];

			for (let i = 0; i < buttonsQuantity; i++) {
				arrayButtons.push(i);
			}

			setTotalButtons(arrayButtons);

			setDbUsers(users);

			console.log(response.data);
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
					console.log(error);
					Swal.fire("Error al borrar", "No se pudo borrar el usuario", "error");
				}
			}
		});

		// const users =
		// Debo actualizar el estado de mis usuarios quitando el user que se BORRO
	}

	useEffect(
		function () {
			getUsers();
			// getCategories();
		}, //	Funcion que se ejecuta cuando se monta el componente
		[limit],
	);

	// async function getCategories() {
	// 	try {
	// 		const response = await axios.get(`${URL}/categories`);
	// 		const categoriesDB = response.data.categories;

	// 		//	Setear un estado que maneje las categorias
	// 		setCategories(categoriesDB);
	// 	} catch (error) {
	// 		console.log("No se pudieron obtener las categorias");
	// 	}
	// }

	async function handleSearch(e) {
		// Hacer una peticion a mi servidor para buscar usuarios
		try {
			const search = e.target.value;

			if(!search) getUsers();

			if (search.length <= 3) return;

			const response = await axios.get(`${URL}/users/search/${search}`);

			const users = response.data.users;

			setDbUsers(users);

		} catch (error) {
			console.log(error)
			// Mensaje para el usuario de que no se pudo buscar o algo
		}
	}

	function fnSetFormValue(user) {
		
		const { _id, ...formValue } = user;
		setUserId(_id);
		setFormValue(formValue);
	}

	return (
		<div className="admin-dashboard">
			<div className="form-container">
				{/* Formulario de carga de productos */}
				<div className="form-sticky">
					<RegisterForm getUsers={getUsers} formValue={formValue} userId={userId} setUserId={setUserId} />
				</div>
			</div>

			<div className="table-container">
				{/* Tabla con mis productos para manejar el CRUD de los mismos */}
				<div className="flex-between">
					<h2>Tabla de productos</h2>
					<div className="input-group">
					<label htmlFor="search">Buscar producto</label>
						<input type="text" id="search" onKeyUp={handleSearch} />
					</div>
				</div>
				<UserTable
					users={dbUsers}
					deleteUser={deleteUser}
					fnSetFormValue={fnSetFormValue}
				/>
				<div className="table-utils">
					<div className="pagination-container">
						{totalButtons.map((btn) => (
							<button key={btn} onClick={() => getUsers(btn)}>
								{btn + 1}
							</button>
						))}
						{/* {Array.from({ length: Math.ceil(total / limit) }).map((_, idx) => (
							<button key={idx} onClick={() => getUsers(idx)}>
								{idx + 1}
							</button>
						))} */}
					</div>
					<div>
						<select onChange={(e) => setLimit(e.target.value)}>
							<option value={2}>2</option>
							<option value={5}>5</option>
							<option value={10}>10</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminUser;
