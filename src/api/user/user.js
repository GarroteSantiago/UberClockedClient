import client from '../client'

export const createUser = async (role_id, name_tag, email, password) => {
    return await client.post('/users', {role_id, name_tag, email, password})
}

export const readMe = async () => {
    return await client.get('/users/me')
}

export const readAllUsers = async () => {
    return  await client.get('/users')
}

export const readUserById = async (id) => {
    return await client.get(`/users/${id}`)
}

export const updateMe = async (data) => {
    return await client.patch(`/users/me`, data)
}

export const updateUser = async (id, data) => {
    return await client.patch(`/users/${id}`, data)
}

export const deleteUser = async (id) => {
    return await client.delete(`/users/${id}`)
}