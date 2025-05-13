import client from './client.js'


export const createProduct = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("image_url", data.image_url);
    formData.append("image_alt", data.image_alt);
    formData.append("component_id", data.component_id);
    formData.append("price", data.price);
    formData.append("rating", data.rating || 0);

    return client.post("/products", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};


export const readAllProducts = async () => {
    return await client.get('/products');
}

export const readProductById = async (id) => {
    return await client.get(`/products/${id}`);
}

export const updateProduct = async (id, data) => {
    return await client.patch(`/products/${id}`, data);
}

export const deleteProduct = async (id) => {
    return await client.delete(`/products/${id}`);
}