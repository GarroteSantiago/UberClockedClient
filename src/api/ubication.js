import client from './client'

export const createUbication = async (locality_id, province_id, country_id) => {
    await client.post('/ubication', {country_id, province_id, locality_id})
}

export const readAllUbications = async () => {
    await client.get('/ubications')
}

export const readUbicationById = async (id) => {
    await client.get(`/ubications/${id}`)
}

export const deleteUbication = async (id) => {
    await client.delete(`/ubications/${id}`)
}