import axios from 'axios';

const instance = axios.create({
    API_URL:  "http://127.0.0.1:8000/",  // Update with your backend URL
});

instance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            config.headers['Authorization'] = `JWT ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;