import client from './client';

export const createComponent = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);

    return client.post("/components", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

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