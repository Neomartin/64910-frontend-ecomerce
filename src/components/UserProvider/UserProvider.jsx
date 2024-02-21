import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const URL = import.meta.env.VITE_SERVER_URL;


export const UserProvider = ({ children }) => {

    const [ user, setUser ] = useState(() => 
        JSON.parse(localStorage.getItem('currentUser')) || null);
    const [ admin, setAdmin] = useState(JSON.parse(localStorage.getItem('currentUser'))?.role === 'ADMIN_ROLE' || false);
    const navigate = useNavigate();

    async function login(data) {
        try {
            
            const response = await axios.post(`${URL}/login`, data)

            const { token, user } = response.data;

            localStorage.setItem('token', token)
            localStorage.setItem('currentUser', JSON.stringify(user))
            // Defino si el usuario es admin preguntando por su rol
            const isAdmin = user.role === 'ADMIN_ROLE';

            // Seteo el estado admin con el valor de la comprobación anterior
            setAdmin(isAdmin)

            setUser(user);

            Swal.fire({
                title: 'Login correcto',
                text: 'Sera redireccionado en breve',
                icon: 'success',
                timer: 1500
            }).then(() => { 
                
                // Se vaya a la ruta principal
                navigate('/')
            })

           

        } catch (error) {
            console.log(error)
            Swal.fire({
                title: 'Error al ingresar',
                text: 'Alguno de los datos ingresados no es correcto',
                icon: 'error',
            })
        }
    }

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        setUser(null);
        navigate('/login');
    }

    return (
        <UserContext.Provider value={{ user, admin, login, logout }}>
            { children }
        </UserContext.Provider>
    )

}