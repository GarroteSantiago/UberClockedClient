import useAuth from '../stores/auth.js';
import {jwtDecode} from 'jwt-decode';

export const hasPermission = (requiredRole) => {
    const token = useAuth.getState().token;
    if (token) {
        return jwtDecode(token).role === requiredRole;
    } else {
        return false;
    }
};