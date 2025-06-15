import client from '../client.js';

export const readAllInvoices = async () => {
    return await client.get(`/invoices`);
}
