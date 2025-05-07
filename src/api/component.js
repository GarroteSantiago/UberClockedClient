import client from './client';

export const createComponent = async (name, description) => {
    await client.post('/components', {name, description});
}

export const readAllComponents = async () => {
    await client.get(`/components`);
}

export const readComponentById = async (id) => {
    await client.get(`/components/${id}`);
}

export const updateComponent = async (id, data) => {
    await client.patch(`/components/${id}`, data);
}

export const deleteComponent = async (id) => {
    await client.delete(`/components/${id}`);
}