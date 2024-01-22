import { Navigate } from 'react-router-dom';


export default function AdminRoute({ children }) {

    // obtuve del localStorage las si el usuario tiene rol ADMIN
    const isAdmin = true;

    return isAdmin ? children : <Navigate to='/' replace />
}
