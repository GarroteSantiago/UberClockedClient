import client from '../client.js'

export const createLocality = async (name) => {
    return await client.post('/localities/', {name})
}

export const readAllLocalities = async () => {
    return await client.get('/localities')
}

export const readLocalityById = async (id) => {
    return await client.get(`/localities/${id}`)
}

export const updateLocality = async (id, data) => {
    return await client.patch(`/localities/${id}`, data)
}

export const deleteLocality = async (id) => {
    return await client.delete(`/localities/${id}`)
}
