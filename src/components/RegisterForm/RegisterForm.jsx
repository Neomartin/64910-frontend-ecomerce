import { useUser } from '@/context/UserContext';

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

const URL = import.meta.env.VITE_SERVER_URL;
// Defino variable global para mi componente para user el TOKEN en distintas peticiones
const TOKEN = localStorage.getItem("token");

const RegisterForm = ({ getUsers, formValue, userId, setUserId }) => {
	const { register, handleSubmit, setValue, reset } = useForm();
	const { logout } = useUser();
	console.log(userId)
	// Obtener data del formulario y hacer un POST o un PUT
	async function submitedData(data) {
		try {
			console.log(data);

			const formData = new FormData();

			formData.append("name", data.name);
			formData.append("email", data.email);
			if(!userId) {
				formData.append("password", data.password);
			}
			formData.append("age", data.age);
			formData.append("location", data.location);
			// Imagen tengo que hacer algo diferente
			formData.append("image", data.image[0])

			// for(const key of Object.keys(data)) {
			// 	if(key === 'image') {
			// 		formData.append(key, data.image[0])
			// 		continue;
			// 	}
			// 	formData.append(key, data[key])
			// }

			/* Vamos a definir si tenemos que hacer un 
					POST: añadir usuario
					PUT: vamos a editar un usuario
			*/

			if (userId) {
				if (!TOKEN) return;
				console.log("Estoy editando un usuario"	)
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
				if(getUsers) {
					getUsers()
					setUserId(null);
				};
				// Hago un return para que mi código que sigue luego del if no se ejecute
				return;
			}

			const response = await axios.post(`${URL}/users`, formData);
			console.log(response.data);
			Swal.fire({
				title: "Usuario Creado",
				text: `El usuario ${response.data.user?.name} fue creado correctamente`,
				icon: "success",
			});

			reset();
			if(getUsers) getUsers();
			
			// setFormValue();
		} catch (error) {
			console.log(error);
			Swal.fire({
				icon: "error",
				title: "No se creo usuario",
				text: "Alguno de los datos ingresados no es correcto",
			});
			if(error.response.status === 401) {
				logout();
			}
		}
	}

	if(formValue) {
			setValue("name", formValue?.name || "");
			setValue("email", formValue?.email || "");

			setValue("age", formValue?.age || "");
			setValue("location", formValue?.location || "");
	}

  	return (
		<div className='form-wrapper'>
						<h2 className="admin-form-title">
							Registro de Usuarios
						</h2>

						<form className="admin-form" onSubmit={handleSubmit(submitedData)} 
								encType="multipart/form-data">
							<div className="input-group">
								<label htmlFor="product">Nombre Completo</label>
								<input
									type="text"
									id="product"
									className="admin-input"
									{...register("name")}
								/>
							</div>
							<div className="input-group">
								<label htmlFor="">Email</label>
								<input
									type="email"
									className="admin-input"
									{...register("email")}
								/>
							</div>
							<div className="input-group">
								<label htmlFor="">Contraseña</label>
								<input
									type="password"
									className="admin-input"
									disabled={userId}
									{...register("password")}
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
									accept="image/*"
									className="admin-input"
									{...register("image")}
								/>
							</div>

							<div className="input-group">
								<label htmlFor="location">Seleccione Cateroria</label>
								<select id="location" {...register("location")}>
								<option value="buenos_aires">BUENOS AIRES</option>
								<option value="catamarca">CATAMARCA</option>
								<option value="chaco">CHACO</option>
								<option value="chubut">CHUBUT</option>
								<option value="ciudad_autonoma_bs_as">CIUDAD AUTONOMA DE Bs As</option>
								<option value="cordoba">CORDOBA</option>
								<option value="corrientes">CORRIENTES</option>
								<option value="entre_rios">ENTRE RIOS</option>
								<option value="formosa">FORMOSA</option>
								<option value="jujuy">JUJUY</option>
								<option value="la_pampa">LA PAMPA</option>
								<option value="la_rioja">LA RIOJA</option>
								<option value="mendoza">MENDOZA</option>
								<option value="misiones">MISIONES</option>
								<option value="neuquen">NEUQUEN</option>
								<option value="rio_negro">RIO NEGRO</option>
								<option value="salta">SALTA</option>
								<option value="san_luis">SAN LUIS</option>
								<option value="santa_cruz">SANTA CRUZ</option>
								<option value="santa_fe">SANTA FE</option>
								<option value="santiago_del_estero">SANTIAGO DEL ESTERO</option>
								<option value="tierra_del_fuego">TIERRA DEL FUEGO</option>
								<option disabled defaultValue>Seleccionar una Provincia</option>
								</select>
							</div>

							<div className="input-group">
								<button type="submit" className={userId ? "btn-success" : ""}>
									{userId ? "Editar usuario" : "Añadir Usuario"}
								</button>
							</div>
						</form>
		</div>
    )
}

export default RegisterForm;