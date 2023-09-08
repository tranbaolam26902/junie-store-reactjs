// Libraries
import axios from 'axios';

// Constants
const baseURL = import.meta.env.VITE_API_ENDPOINT;

export default axios.create({
    baseURL
});

export const axiosPrivate = axios.create({
    baseURL,
    withCredentials: true
});
