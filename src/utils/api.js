import axios from 'axios';

const api = axios.create({
    // Use root paths because vite proxy handles it, or just relative to origin
    baseURL: '/'
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

// api.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.response && error.response.status === 401) {
//             localStorage.removeItem('token');
//             localStorage.removeItem('user');
//             window.location.href = '/login';
//         }
//         return Promise.reject(error);
//     }
// );

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            const url = error.config?.url || '';
            // Only logout for auth-related 401s, not failed data fetches
            if (url.includes('/api/login') || url.includes('/api/auth')) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
