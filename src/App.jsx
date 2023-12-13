import './App.css'

import { Routes, Route, NavLink } from 'react-router-dom' 

import Home from './pages/Home/Home'
import Contact from './pages/Contact/Contact'
import Register from './pages/Register/Register'
import AboutUs from './pages/AboutUs/AboutUs'
import Login from './pages/Login/Login'


function App() {

  return (
    <>
      <header className='header'>
        <NavLink to="/" className="nav-link">Principal</NavLink>
        <NavLink to="/contact" className="nav-link">Contacto</NavLink>
        <NavLink to="/about-us" className="nav-link">Acerca de</NavLink>
        <NavLink to="/register" className="nav-link">Registro</NavLink>
        <NavLink to="/admin-product" className="nav-link">Admin Product</NavLink>
        <NavLink to="/admin-user" className="nav-link">Admin user</NavLink>
      </header>


      <main className="main">
        <Routes>
          <Route path='/' element={ <Home /> }   />
          <Route path='/contact' element={ <Contact /> } />
          <Route path='/about-us' element={ <AboutUs /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/register' element={ <Register /> } />
        </Routes>

           
      </main>
      
      <footer className='footer'>
        PIE PÁGINA
      </footer>
    </>
  )
}

export default App
