import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
const URL = import.meta.env.VITE_SERVER_URL;

export default function AdminProduct() {
	const { register, handleSubmit } = useForm();
	const [ categories, setCategories ] = useState([]);

	useEffect(() => {
		getCategories();
	}, [])

	async function getCategories() {
		try {
			const response = await axios.get(`${URL}/product/categories`);
			const { categories } = response.data;

			setCategories(categories);

		} catch (error) {
			console.log(error);
			Swal.fire('Error', 'Ocurrio un error al obtener las categorias', 'error');
		}
	}

	async function submitedData(data) {
		try {
			// TODO: enviar estos datos al backend como body de la request POST, llamar el endpoint POST /products
			const formData = new FormData();
			Object.keys(data).forEach(key => {
				if(key === 'image') {
					formData.append(key, data[key][0]);
					return;
				}
				formData.append(key, data[key]);
			});

			formData.forEach((value, key) => console.log(key, value));

			await axios.post(`${URL}/products`, formData, {
				headers: {
					'Authorization': localStorage.getItem('token')

				}
			});

			Swal.fire('Producto creado', 'El producto fue creado con exito', 'success');
		} catch (error) {
			console.log(error);
			Swal.fire('Error', 'Ocurrio un error al crear el producto', 'error');
		}
	}

	return (
		<div className="admin-dashboard">
			<div className="form-container">
				{/* Formulario de carga de productos */}
				<h2>Carga Producto</h2>

				<form className="admin-form" onSubmit={handleSubmit(submitedData)}>
					<div className="input-group">
						<label htmlFor="product">Producto</label>
						<input
							type="text"
							id="product"
							className="admin-input"
							{...register("name")}
						/>
					</div>
					<div className="input-group">
						<label htmlFor="">Precio</label>
						<input
							type="number"
							className="admin-input"
							{...register("price")}
						/>
					</div>
					<div className="input-group">
						<label htmlFor="">Descripcion</label>
						<textarea
							rows={6}
							className="admin-input"
							{...register("description")}
						></textarea>
					</div>
					<div className="input-group">
						<label htmlFor="image">Imagen</label>
						<input type="file" id="image" className="admin-input" {...register("image")} />
					</div>
					<div className="input-group">
						<label htmlFor=""></label>
					</div>
					<div className="input-group">
						<input
							type="checkbox"
							className="admin-input"
							{...register("active")}
						/>
						Activo
					</div>
					<div className="input-group">
						<select defaultValue="default" disabled={!categories.length} className="admin-input" {...register("category")}>
								<option value="default" disabled>
									Seleccione una categoria
								</option>
							{categories.map((category) => (
								<option key={category._id} value={category._id}>
									{category.name}
								</option>))
							}
						</select>
					</div>
					<div className="input-group">
						<button type="submit">Crear Producto</button>
					</div>
				</form>
			</div>

			<div className="table-container">
				{/* Tabla con mis productos para manejar el CRUD de los mismos */}
				<h2>Tabla de productos</h2>
			</div>
		</div>
	);
}
