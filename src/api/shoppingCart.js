import client from './client.js'

const baseUrl = '/shoppingCart';

export const createShoppingCart = async (name) => {
    await client.post(`${baseUrl}/`, {name});
}

export const createProductInShoppingCart = async (cart_id, product_id, quantity) => {
    await client.post(`${baseUrl}/${cart_id}/products`, {product_id, quantity});
}

export const readAllShoppingCartsOfUser = async () => {
    await client.get(`${baseUrl}/`, {});
}

export const readCartById = async (id) => {
    await client.get(`${baseUrl}/${id}`);
}

export const readAllProductsInShoppingCart = async (cart_id) => {
    await client.get(`${baseUrl}/${cart_id}/products`);
}

export const updateCart = async (id, data) => {
    await client.put(`${baseUrl }/${id}`, data);
}

export const deleteCart = async (id) => {
    await client.delete(`${baseUrl}/${id}`);
}

export const deleteProductInShoppingCart = async (cart_id, product_id) => {
    await client.delete(`${baseUrl}/${cart_id}/products/${product_id}`);
}