import { UserTableRow } from "../UserTableRow/UserTableRow";

export const UserTable = ({ users, deleteUser, setFormValue }) => {
	// console.log(props);

	return (
		<div className="table-container">
			<table className="table-admin">
				<thead>
					<tr>
						<th>Imagen</th>
						<th>Nombre Completo</th>
						<th>Email</th>
						<th>Localidad</th>
						<th>Rol</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{users.map((usr) => (
						<UserTableRow
							key={usr._id}
							usr={usr}
							deleteUser={deleteUser}
							setFormValue={setFormValue}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};
