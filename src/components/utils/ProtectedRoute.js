import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../stores/auth.js';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading, initialize } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        initialize();
    }, [initialize]);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate('/login', { replace: true });
        }
    }, [isLoading, isAuthenticated, navigate]);

    if (isLoading || !isAuthenticated) {
        return <div>Loading...</div>; // Or a loading spinner
    }

    return children;
};

export default ProtectedRoute;