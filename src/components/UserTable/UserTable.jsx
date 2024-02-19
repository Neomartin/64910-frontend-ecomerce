import { UserTableRow } from "../UserTableRow/UserTableRow";
import { useUser } from "@/context/UserContext";

export const UserTable = ({ users, deleteUser, fnSetFormValue }) => {
	const { user } = useUser();

	console.log(user)

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
							fnSetFormValue={fnSetFormValue}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};
