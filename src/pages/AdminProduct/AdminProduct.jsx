import { useForm } from "react-hook-form";

export default function AdminProduct() {
	const { register, handleSubmit } = useForm();

	function submitedData(data) {
		console.log(data);
		// TODO: enviar estos datos al backend como body de la request POST, llamar el endpoint POST /products
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
						<label htmlFor="">Imagen</label>
						<input type="url" className="admin-input" {...register("image")} />
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
						<select className="admin-input" {...register("category")}>
							<option value="consoles_sony">Consolas Playstation</option>
							<option value="consoles_microsoft">Consolas XBOX</option>
							<option value="pc">Computadoras</option>
							<option value="accesories">Accesorios</option>
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
