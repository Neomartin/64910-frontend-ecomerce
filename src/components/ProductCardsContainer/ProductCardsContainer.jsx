import axios from 'axios'
import { useEffect, useState } from 'react'
import { ProductCard } from '../ProductCard/ProductCard';

export const ProductCardsContainer = () => {
    const [users, setUsers] = useState([]);
    const [addUser, setAddUser] = useState(false);

    useEffect(function() {
        //Codigo que se ejecuta cuando se monta el componente
        console.log('Se monto el componente')
        getUsers()

    }, [ addUser ])

    async function getUsers() {
        try {
            //Pedido al backend de los usuarios para luego pintarlos
            const response = await axios.get('http://localhost:3000/users')
            
            setUsers(response.data.users);

            console.log(response)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h1>Lista de Productos</h1>
            <div className='product-container'>
                {
                    users.map(user => {
                        return (
                            //Llamar al componente ProductCard
                            <ProductCard user={user} key={user._id} />
                        )
                    })

                }
            </div>
        </>
    )
}
