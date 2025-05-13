import client from '../client.js'

export const createUbication = async (locality_id, province_id, country_id) => {
    return await client.post('/ubication', {country_id, province_id, locality_id})
}

export const readAllUbications = async () => {
    return await client.get('/ubications')
}

export const readUbicationById = async (id) => {
    return await client.get(`/ubications/${id}`)
}

export const deleteUbication = async (id) => {
    return await client.delete(`/ubications/${id}`)
}