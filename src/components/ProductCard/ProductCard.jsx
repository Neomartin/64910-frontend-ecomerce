import { useOrder } from '@/context/OrderContext';
import productDefault from '../../assets/images/default-product.png';
import './ProductCard.css';

const URL = import.meta.env.VITE_SERVER_URL;

export const ProductCard = ({ product }) => {

    // const { user } = props;
    const { addItem } = useOrder();
    
    return (
        <div className="card" >
                <div className="card-header">
                    {
                        product.image 
                            ? <img src={`${URL}/images/users/${product.image}`} alt={product.name} />
                            : <img src={productDefault} alt='imagen de producto por defecto' />                    }

                </div>
                <small>{product._id}</small>
                <h2>{product.name}</h2>
                <p>{product.age}</p>
                <p>{product.email}</p>
                <button className="btn" onClick={() => addItem(product)}>Comprar</button>
        </div>
    )
}
