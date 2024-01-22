import './Login.css';
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault();
    const el = event.target.elements;

    

    const data = {
      email: el.email.value,
      password: el.password.value
    }

    login(data)
    /* {
      email: user@gmail.com
      password: alfa
    } */
  }

  async function login(data) {

    try {
      console.log(import.meta.env)
      //                                  http://localhost:3000

      const response = await axios.post(import.meta.env.VITE_SERVER_URL + '/login', data )

      const { token, user } = response.data;
      
      localStorage.setItem('token', token)
      localStorage.setItem('currentUser', JSON.stringify(user))
      // const token = response.data.token;
      // const user = response.data.user;
      Swal.fire({
        title: 'Login correcto',
        text: 'Sera redireccionado en breve',
        icon: 'success',
        timer: 1500
      }).then(() => {
        navigate("/")
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

  return (
      <div className="login-container">

        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Ingresar</h1>
          <label>Correo electrónico</label>
          <input name="email" required type="text" placeholder="Correo electrónico" />

          <label>Contraseña</label>
          <input name="password" required type="password" placeholder="Contraseña" />

          <button type="submit" className="button">Ingresar</button>
        </form>

      </div>
  )
}
