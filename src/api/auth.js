import client from './client.js'

export const login = async (email, password) => {
    await client.post('/auth/token', {email, password});
}

export const logout = async (token) => {
    await client.post('/auth/', {token});
}