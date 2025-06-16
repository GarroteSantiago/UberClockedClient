import client from '../client';

export const createOrder = (data) => {
    const formData = new FormData();
    formData.append("cart_id", data.cart_id);
    formData.append("payment_method", data.payment_method);
    return client.post("/orders", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

export const readAllOrders = async () => {
    return await client.get(`/orders/all`);
}

export const readAllUserOrders = async () => {
    return await client.get(`/orders`);
}

export const readOrderById = async (id) => {
    return await client.get(`/orders/${id}`);
}

export const updateOrder = async (id, data) => {
    return await client.patch(`/orders/${id}`, data);
}