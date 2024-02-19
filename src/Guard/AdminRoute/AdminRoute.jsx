import { useUser } from '@/context/UserContext';
import { Navigate } from 'react-router-dom';


export default function AdminRoute({ children }) {

    // obtuve del localStorage las si el usuario tiene rol ADMIN
    const { admin } = useUser();

    return admin ? children : <Navigate to='/' replace />
}
