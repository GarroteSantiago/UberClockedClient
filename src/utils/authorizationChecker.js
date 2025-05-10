import useAuth from '../stores/auth.js';

export const hasPermission = (requiredRole) => {
    const user = useAuth.getState().user;
    if (user) {
        return user.role === requiredRole;
    } else {
        return false;
    }
};