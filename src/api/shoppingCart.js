import client from './client.js'

const baseUrl = '/shoppingCart';

export const createShoppingCart = async (name) => {
    return await client.post(`${baseUrl}/`, {name});
}

export const createProductInShoppingCart = async (cart_id, product_id, quantity) => {
    return await client.post(`${baseUrl}/${cart_id}/products`, {product_id, quantity});
}

export const readAllShoppingCartsOfUser = async () => {
    return await client.get(`${baseUrl}/`, {});
}

export const readCartById = async (id) => {
    return await client.get(`${baseUrl}/${id}`);
}

export const readAllProductsInShoppingCart = async (cart_id) => {
    return await client.get(`${baseUrl}/${cart_id}/products`);
}

export const updateCart = async (id, data) => {
    return await client.put(`${baseUrl }/${id}`, data);
}

export const deleteCart = async (id) => {
    return await client.delete(`${baseUrl}/${id}`);
}

export const deleteProductInShoppingCart = async (cart_id, product_id) => {
    return await client.delete(`${baseUrl}/${cart_id}/products/${product_id}`);
}