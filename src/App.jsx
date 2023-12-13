import './App.css'
import { Routes } from 'react-router-dom' 

function App() {

  return (
    <>
      <header className='header'>
        <a href="#">Principal</a>
        <a href="#">Contacto</a>
        <a href="#">Acerca de</a>
        <a href="#">Registro</a>
        <a href="#">Admin Product</a>
        <a href="#">Admin user</a>
      </header>


      <main className="main">
        <Routes>
          

        </Routes>
        <h1>HOME</h1>
        <h1>Contacto</h1>
        <h1>Registro</h1>
        <h1>Acerca de</h1>
        <h1>Admin Product</h1>
        <h1>Admin User</h1>

           
      </main>
      
      <footer className='footer'>
        PIE PÁGINA
      </footer>
    </>
  )
}

export default App
