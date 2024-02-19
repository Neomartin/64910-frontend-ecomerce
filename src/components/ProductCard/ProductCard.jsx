import './ProductCard.css';
const URL = import.meta.env.VITE_SERVER_URL;
export const ProductCard = ({ user }) => {

    // const { user } = props;
    
    return (
        <div className="card">
                <div className="card-header">
                    <img src={`${URL}/images/users/${user.image}`} alt={user.name} />
                </div>
                <div className="card-body">
                    <small>{user.location}</small>
                    <h2>{user.name}</h2>
                    <p className="product-price">${user.age}</p>
                    <p className="product-date">{user.email}</p>
                </div>
                <div className="card-footer">
                    <button className="btn transparent">Ver mas</button>
                    <button className="btn">Comprar</button>
                </div>
        </div>
    )
}
