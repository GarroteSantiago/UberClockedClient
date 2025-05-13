import client from './client.js'

export const createProduct = async (name, description, image_url, image_alt, component_id, price, rating) => {
    return await client.post('/products', {name, description, image_url, image_alt, component_id, price, rating})
};

export const readAllProducts = async () => {
    return await client.get('/products');
}

export const readProductById = async (id) => {
    return await client.get(`/products/${id}`);
}

export const updateProduct = async (id, data) => {
    return await client.put(`/products/${id}`, data);
}

export const deleteProduct = async (id) => {
    return await client.delete(`/products/${id}`);
}