import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../stores/auth.js';
import LoadingSpinner from '../../components/utils/LoadingSpinner'; // Your custom loading component

const ProtectedRoute = ({ children, roles = [] }) => {
    const { isAuthenticated, isLoading, initialize, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        initialize();
    }, [initialize]);

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                navigate('/login', {
                    replace: true,
                    state: { from: location }
                });
            }
            else if (roles.length > 0 && !roles.includes(user?.Role.name)) {
                navigate('/unauthorized', { replace: true });
            }
        }
    }, [isLoading, isAuthenticated, navigate, roles, location]);

    if (isLoading) {
        return <LoadingSpinner fullPage />;
    }

    if (!isAuthenticated || (roles.length > 0 && !roles.includes(user?.Role.name))) {
        return null;
    }

    return children;
};

export default ProtectedRoute;