import client from "../client.js";


export const createCountry = async (name) => {
    return await client.post(`/countries`, {name})
}

export const readAllCountries = async () => {
    return await client.get('/countries')
}

export const readCountryById = async (id) => {
    return await client.get(`/countries/${id}`)
}

export const updateCountry = async (id, name) => {
    return await client.patch(`/countries/${id}`, name)
}

export const deleteCountry = async (id) => {
    return await client.delete(`/countries/${id}`)
}