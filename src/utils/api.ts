import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080', // Ganti dengan base URL backend Spring Boot Anda
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getCart = async (email: string) => {
  const response = await axios.get(`/api/cart/view/${email}`);
  return response.data;
};

export const clearCart = async (email: string) => {
  const response = await axios.delete(`/api/cart/clear/${email}`);
  return response.data;
};

export const incrementItem = async (email: string, itemId: string) => {
  const response = await axios.post('/api/cart/increment', { email, itemId });
  return response.data;
};

export const decrementItem = async (email: string, itemId: string) => {
  const response = await axios.post('/api/cart/decrement', { email, itemId });
  return response.data;
};

export const removeItem = async (email: string, itemId: string) => {
  const response = await axios.delete('/api/cart/remove', { data: { email, itemId } });
  return response.data;
};

export const updateItem = async (email: string, itemId: string, quantity: number) => {
  const response = await axios.put('/api/cart/update', { email, itemId, quantity });
  return response.data;
};


export default instance;