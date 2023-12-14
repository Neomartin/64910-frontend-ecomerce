import { NavLink } from "react-router-dom";
import './Header.css'
// import LINKS from '../../LINKS';

export default function Header() {

    const isAdmin = false;

    // const avaibleLinks = LINKS.filter(link => isAdmin || !link.admin)

    return (
        <header className='header'>
            <NavLink to="/" className={ ({isActive}) => isActive ? "nav-link active" : "nav-link" }>Principal</NavLink>
            <NavLink to="/contact" className="nav-link">Contacto</NavLink>
            <NavLink to="/about-us" className="nav-link">Acerca de</NavLink>
            <NavLink to="/register" className="nav-link">Registro</NavLink>
            { isAdmin && (
                    <>
                        <NavLink to="/admin-product" className="nav-link">Admin Product</NavLink>
                        <NavLink to="/admin-user" className="nav-link">Admin user</NavLink>
                    </>
                )
            }

            {/* {
                avaibleLinks.map(link => (
                    <NavLink key={link.path} className="nav-link" to={link.path} >{link.text}</NavLink>
                ))
            } */}

            
        </header>
    )
}
