import axios from 'axios';
import useAuth from '../stores/auth';

const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor (get Token from auth store)
client.interceptors.request.use(
    (config) => {
        const token = useAuth.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor (To handle errors globally)
client.interceptors.response.use(
    (response) => response.data,
    (error) => {
        return Promise.reject(error.response?.data || error.message);
    }
);

export default client;