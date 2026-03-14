import axios from 'axios';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: 'https://mjh-3-13-project-blood-donation-app.vercel.app'
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    // Request interceptor to add authorization header for every secure call
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    // Response interceptor to handle 401 and 403 errors automatically
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        // If the token is expired or invalid, log the user out and send to login
        if (status === 401 || status === 403) {
            await logOut();
            navigate('/login');
        }
        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;