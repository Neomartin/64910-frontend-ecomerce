import './App.css'
import React from "react"
import { Routes, Route } from 'react-router-dom' 

import Home from './pages/Home/Home'
import Contact from './pages/Contact/Contact'
import Register from './pages/Register/Register'
import AboutUs from './pages/AboutUs/AboutUs'
import Login from './pages/Login/Login'
import Header from './layout/Header/Header'
import Footer from './layout/Footer/Footer'
import AdminProduct from './pages/AdminProduct/AdminProduct'
import AdminRoute from './guard/AdminRoute/AdminRoute'
import AdminUser from './pages/AdminUser/AdminUser'

function App() {

  return (
    <>
      <Header />

      <main className="main">
        <Routes>
          <Route path='/' element={ <Home /> }   />
          <Route path='/contact' element={ <Contact /> } />
          <Route path='/about-us' element={ <AboutUs /> } />

          <Route path='/login' element={ <Login /> } />

          
          <Route path='/register' element={ <Register /> } />

          {/* Rutas protegidas con el Guard AdminRoute */}
          <Route  path='/admin-product' 
                  element={ <AdminRoute>

                                <AdminProduct />
                                
                            </AdminRoute>       
                          } 
          />
          <Route  path='/admin-user' 
                  element={ <AdminRoute>
                                <AdminUser />
                            </AdminRoute>       
                          } 
          />


        </Routes>
      </main>
      
      <Footer />
    </>
  )
}

export default App
