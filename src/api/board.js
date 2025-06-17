import client from './client.js';

const baseUrl = '/boards';

export const createBoard = async (title, description) => {
    return await client.post(`${baseUrl}/`, {title, description});
};

export const createBoardInterest = async (board_id) => {
    return await client.post(`${baseUrl}/${board_id}/interested-users`);
};

export const readAllBoards = async () => {
    return await client.get(`${baseUrl}/`);
};

export const readBoardById = async (id) => {
    return await client.get(`${baseUrl}/${id}`);
};

export const readBoardInterestedUsers = async (board_id) => {
    return await client.get(`${baseUrl}/${board_id}/interested-users`);
};

export const readMyBoards = async () => {
    return await client.get(`${baseUrl}/me`);
};

export const readMyInterestedBoards = async () => {
    return await client.get(`${baseUrl}/me/interested`);
};

export const updateBoard = async (id, data) => {
    return await client.patch(`${baseUrl}/${id}`, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
};

export const deleteBoard = async (id) => {
    return await client.delete(`${baseUrl}/${id}`);
};

export const deleteBoardInterest = async (board_id) => {
    return await client.delete(`${baseUrl}/${board_id}/interested-users`);
};
