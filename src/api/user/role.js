import client from '../client'

export const createRole = async (name) => {
    return await client.post(`/roles`, {name})
}

export const readAllRoles = async () => {
    return await client.get('/roles')
}

export const readRoleById = async (id) => {
    return await client.get(`/roles/${id}`)
}

export const updateRole = async (id, data) => {
    return await client.patch(`/roles/${id}`, data)
}

export const deleteRole = async (id) => {
    return await client.delete(`/roles/${id}`)
}