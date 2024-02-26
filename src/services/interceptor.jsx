import axios from 'axios';
import Swal from 'sweetalert2';

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    headers: {
        'Authorization': localStorage.getItem('token')
    }
});

api.interceptors.response.use(
    response => response,
    error => {
        console.log(error.response)
        if(error.response?.status === 401) {
            Swal.fire({
                title: 'Error',
                text: 'Su sesión expiró, por favor inicie sesion nuevamente',
                icon: 'error',
            })

            
            setTimeout(() => {
                window.location.href = '/login';
                localStorage.removeItem('token');
                localStorage.removeItem('currentUser');
            }, 2000)
        }
    }
)

export default api;