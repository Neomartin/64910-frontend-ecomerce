import defaultPicture from "../../assets/images/default-profile-picture.png";
export const UserTableRow = ({ usr, deleteUser, setFormValue }) => {
	return (
		<tr key={usr._id}>
			<td className="table-img">
				<img
					src={usr.image ? usr.image : defaultPicture}
					alt={`${usr.name} profile picture`}
				/>
			</td>
			<td className="table-name">{usr.name.toUpperCase()}</td>
			<td className="table-email">{usr.email}</td>
			<td className="table-location">
				{usr.location ? usr.location : <span className="no-data">NO DATA</span>}
			</td>
			<td className="table-role">{usr.role}</td>
			<td className="table-actions">
				<div className="btn-container">
					<button
						className="btn btn-delete"
						onClick={() => deleteUser(usr._id)}
					>
						<i className="fa-solid fa-trash"></i>
					</button>
					<button className="btn btn-edit" onClick={() => setFormValue(usr)}>
						<i className="fa-solid fa-pencil"></i>
					</button>
				</div>
			</td>
		</tr>
	);
};
