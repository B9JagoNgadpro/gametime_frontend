import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface CartItem {
  [key: string]: number;
}

interface Cart {
  email: string;
  items: CartItem;
  totalPrice: number;
}

const CartPage = () => {
  const router = useRouter();
  const { email } = router.query;

  const [cart, setCart] = useState<Cart | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (email) {
      getCart(email as string);
    }
  }, [email]);

  const API_BASE_URL = "http://35.213.132.17/api/cart";

  const getCart = async (email: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/view/${email}`);
      setCart(response.data);
      setError('');
    } catch (error) {
      setError('Failed to fetch cart');
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/clear/${email}`);
      getCart(email as string);
      setError('');
    } catch (error) {
      setError('Failed to clear cart');
    }
  };

  const incrementItem = async (itemId: string) => {
    try {
      await axios.post(`${API_BASE_URL}/increment`, null, {
        params: { email, itemId },
        headers: { 'Content-Type': 'application/json' },
      });
      getCart(email as string);
      setError('');
    } catch (error) {
      setError('Failed to increment item');
    }
  };

  const decrementItem = async (itemId: string) => {
    try {
      await axios.post(`${API_BASE_URL}/decrement`, null, {
        params: { email, itemId },
        headers: { 'Content-Type': 'application/json' },
      });
      getCart(email as string);
      setError('');
    } catch (error) {
      setError('Failed to decrement item');
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/remove`, {
        params: { email, itemId },
        headers: { 'Content-Type': 'application/json' },
      });
      getCart(email as string);
      setError('');
    } catch (error) {
      setError('Failed to remove item');
    }
  };

  if (!cart) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Keranjang Belanja</h1>
      {error && <p className="text-red-500">{error}</p>}
      <p className="text-lg">Email: {cart.email}</p>
      {Object.keys(cart.items).map((itemId) => (
        <div key={itemId} className="flex items-center justify-between border-b py-2">
          <p className="text-lg">Item ID: {itemId} - Quantity: {cart.items[itemId]}</p>
          <div>
            <button
              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
              onClick={() => incrementItem(itemId)}
            >
              +
            </button>
            <button
              className="bg-yellow-500 text-white px-2 py-1 rounded ml-2 hover:bg-yellow-700"
              onClick={() => decrementItem(itemId)}
            >
              -
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded ml-2 hover:bg-red-700"
              onClick={() => removeItem(itemId)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <p className="text-lg mt-4">Total Price: {cart.totalPrice}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
        onClick={clearCart}
      >
        Clear Cart
      </button>
    </div>
  );
};

export default CartPage;
