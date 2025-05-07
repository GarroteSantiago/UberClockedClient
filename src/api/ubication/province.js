import client from '../client.js'


export const createProvince = async (name) => {
    await client.post('/localities/', name)
}

export const readAllProvinces = async () => {
    await client.get('/provinces')
}

export const readProvinceById = async (id) => {
    await client.get(`/provinces/${id}`)
}

export const updateProvince = async (id, data) => {
    await client.patch(`/provinces/${id}`, data)
}

export const deleteProvince = async (id) => {
    await client.delete(`/provinces/${id}`)
}