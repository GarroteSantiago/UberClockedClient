import client from '../client.js'


export const createProvince = async (name) => {
    return await client.post('/localities/', {name})
}

export const readAllProvinces = async () => {
    return await client.get('/provinces')
}

export const readProvinceById = async (id) => {
    return await client.get(`/provinces/${id}`)
}

export const updateProvince = async (id, data) => {
    return await client.patch(`/provinces/${id}`, data)
}

export const deleteProvince = async (id) => {
    return await client.delete(`/provinces/${id}`)
}