import useAuth from '../stores/auth.js';

export const hasPermission = (requiredRole) => {
    const user = useAuth.getState().user;
    if (user) {
        return user.Role.name === requiredRole;
    } else {
        return false;
    }
};

export const isAuthenticated = () => {
    const user = useAuth.getState().user;
    return !!user;
}