import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './components/UserProvider/UserProvider.jsx';
import { OrderProvider } from './context/OrderContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <BrowserRouter>
      <UserProvider>
        <OrderProvider>
          <App />
        </OrderProvider>
      </UserProvider>
    
    </BrowserRouter>

  </React.StrictMode>,
)
