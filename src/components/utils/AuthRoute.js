import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../stores/auth.js';

const AuthRoute = ({ children }) => {
    const { isAuthenticated, isLoading, initialize } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        initialize();
    }, [initialize]);

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            // Redirect to the original path or home
            navigate(location.state?.from || '/home', { replace: true });
        }
    }, [isLoading, isAuthenticated, navigate, location.state]);

    if (isLoading) {
        return <LoadingSpinner fullPage />;
    }

    if (isAuthenticated) {
        return null; // useEffect will handle redirect
    }

    return children;
};

export default AuthRoute;