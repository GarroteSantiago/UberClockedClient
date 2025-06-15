import client from '../client.js';

export const readAllStatuses = async () => {
    return await client.get(`/statuses`);
}
