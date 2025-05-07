import client from './client.js'
import useAuth from '../stores/auth.js'

export const login = async (email, password) => {
    const response = await client.post('/auth/token', {email, password});
    useAuth.getState().set(response.data.token);
}

export const logout = async (/*token*/) => {
    /* The logout method is disabled from the backend since it's not implemented the token blacklist (SHOULD DO)
    await client.post('/auth/', {token});
    */
    useAuth.getState().logout();
}