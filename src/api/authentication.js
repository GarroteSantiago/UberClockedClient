import client from './client.js'
import useAuth from '../stores/auth.js'

const baseUrl = '/auth'

export const login = async (email, password) => {
    const response = await client.post(`${baseUrl}/token`, {email, password});
    useAuth.getState().set(response.user);
}

export const logout = async (/*token*/) => {
    await client.post(`${baseUrl}/`)
    useAuth.getState().logout();
}