import client from "../client.js";


export const createCountry = async (name) => {
    await client.post(`/countries`, name)
}

export const readAllCountries = async () => {
    await client.get('/countries')
}

export const readCountryById = async (id) => {
    await client.get(`/countries/${id}`)
}

export const updateCountry = async (id, name) => {
    await client.patch(`/countries/${id}`, name)
}

export const deleteCountry = async (id) => {
    await client.delete(`/countries/${id}`)
}