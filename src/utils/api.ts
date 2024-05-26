import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080', // Ganti dengan base URL backend Spring Boot Anda
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;