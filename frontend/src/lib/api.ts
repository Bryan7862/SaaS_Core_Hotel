import axios from 'axios';

// Create a configured axios instance
export const api = axios.create({
    baseURL: 'http://localhost:3000', // Base URL for the entire backend
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Inject Tokens and Context
api.interceptors.request.use(
    (config) => {
        // 1. Auth Token
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        // 2. Organization Context
        const companyId = localStorage.getItem('current_company_id');
        if (companyId) {
            config.headers['x-company-id'] = companyId;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Global Error Handling (Optional)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Auto-logout if token expired
            localStorage.removeItem('access_token');
            // Check if we are already on login page to avoid loops
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);
