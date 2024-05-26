// src/utils/api.ts
import axios from 'axios';

const createAxiosInstance = (baseURL: string) => {
    return axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export default createAxiosInstance;