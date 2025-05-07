import client from '../client'

export const createRole = async (name) => {
    await client.post(`/roles`, {name})
}

export const readAllRoles = async () => {
    await client.get('/roles')
}

export const readRoleById = async (id) => {
    await client.get(`/roles/${id}`)
}

export const updateRole = async (id, name) => {
    await client.patch(`/roles/${id}`, {name})
}

export const deleteRole = async (id) => {
    await client.delete(`/roles/${id}`)
}