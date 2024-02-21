import { useUser } from '@/context/UserContext';
import './Footer.css'
export default function Footer() {
  const { logout, user } = useUser();
  return (
    <footer className='footer'>
        PIE PÁGINA
        { user && <p>{user.email}</p> }

        <button onClick={() => logout()}>DESLOGUEAR</button>
    </footer>
  )
}
