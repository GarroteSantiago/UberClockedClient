import client from './client.js'
import useAuth from '../stores/auth.js'

const baseUrl = '/auth'

export const login = async (email, password) => {
    const response = await client.post(`${baseUrl}/token`, {email, password});
    useAuth.getState().login(response.user);
}

export const logout = async (/*token*/) => {
    await client.post(`${baseUrl}/`)
    useAuth.getState().logout();
    await useAuth.getState().initialize()
}

export const checkSession = async () => {
    const response = await client.get(`${baseUrl}/me`, {withCredentials: true});
    useAuth.getState().login(response.user)
}