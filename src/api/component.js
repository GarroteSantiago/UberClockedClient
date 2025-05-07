import client from './client';

export const createComponent = async (name, description) => {
    await client.create('components/', {name, description});
}

export const readAllComponents = async () => {
    await client.get(`components/`);
}

export const readComponentById = async (id) => {
    await client.get(`components/${id}`);
}

export const updateComponent = async (id, name, description) => {
    await client.patch(`components/${id}`, {name, description});
}

export const deleteComponent = async (id) => {
    await client.delete(`components/${id}`);
}