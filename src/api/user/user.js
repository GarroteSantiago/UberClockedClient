import client from '../client'

export const createUser = async (role_id, name_tag, email, password) => {
    await client.post('/users', {role_id, name_tag, email, password})
}

export const readAllUsers = async () => {
    await client.get('/users')
}

export const readUserById = async (id) => {
    await client.get(`/users/${id}`)
}

export const updateUser = async (id, data) => {
    await client.patch(`/users/${id}`, data)
}

export const deleteUser = async (id) => {
    await client.delete(`/users/${id}`)
}