import { useForm } from 'react-hook-form';
import React from 'react';

export default function AdminProduct() {
	const { register, handleSubmit } = useForm();

	function submitedData(data) {
		console.log(data);
	}

	return (
		<div className="admin-dashboard">
			<div className="form-container">
				{/* Formulario de carga de productos */}
				<h2>Carga Producto</h2>

				<form className="admin-form" onSubmit={handleSubmit(submitedData)}>
					<input className="admin-input" {...register('name')} />
					<input className="admin-input" {...register('price')} />
					<input className="admin-input" {...register('description')} />
					<input className="admin-input" {...register('image')} />
					<input className="admin-input" {...register('active')} />
					<input className="admin-input" {...register('category')} />
					<button type="submit">Crear Producto</button>
				</form>
			</div>

			<div className="table-container">
				{/* Tabla con mis productos para manejar el CRUD de los mismos */}
				<h2>Tabla de productos</h2>
			</div>
		</div>
	);
}
