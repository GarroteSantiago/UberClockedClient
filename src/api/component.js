import client from './client';

export const createComponent = async (name, description) => {
    await client.post('/components', {name, description});
}

export const readAllComponents = async () => {
    return await client.get(`/components`);
}

export const readComponentById = async (id) => {
    return await client.get(`/components/${id}`);
}

export const updateComponent = async (id, data) => {
    return await client.patch(`/components/${id}`, data);
}

export const deleteComponent = async (id) => {
    return await client.delete(`/components/${id}`);
}