import client from './client.js'

export const createLocality = async (name) => {
    await client.post('/localities/', name)
}

export const readAllLocalities = async () => {
    await client.get('/localities')
}

export const readLocalityById = async (id) => {
    await client.get(`/localities/${id}`)
}

export const updateLocality = async (id, data) => {
    await client.patch(`/localities/${id}`, data)
}

export const deleteLocality = async (id) => {
    await client.delete(`/localities/${id}`)
}
