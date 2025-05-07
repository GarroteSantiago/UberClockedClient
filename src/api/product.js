import client from './client.js'

export const createProduct = async (name, description, image_url, image_alt, component_id, price, rating) => {
    await client.post('/products', {name, description, image_url, image_alt, component_id, price, rating})
};

export const readAllProducts = async () => {
    await client.get('/products');
}

export const readProductById = async (id) => {
    await client.get(`/products/${id}`);
}

export const updateProduct = async (id, data) => {
    await client.put(`/products/${id}`, data);
}

export const deleteProduct = async (id) => {
    await client.delete(`/products/${id}`);
}