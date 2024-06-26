"use client";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Game {
  id: string;
  nama: string;
  deskripsi: string;
  harga: number;
  kategori: string;
  stok: number;
}

interface CartItem {
  [key: string]: number;
}

interface Cart {
  email: string;
  items: CartItem;
  totalPrice: number;
}

const KeranjangItem = () => {
  const router = useRouter();

  const [cart, setCart] = useState<Cart | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const email = localStorage.getItem("email");
        const token = localStorage.getItem('Authorization');
        if (!email || !token) {
          throw new Error('Unauthorized');
        }

        const response = await axios.get(`/api/cart/view/${email}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        setCart(response.data);
        setError('');
      } catch (error: any) {
        if (error.response && error.response.status === 403) {
          setError('Forbidden: You do not have access to this page, please login as pembeli');
        } else if (error.response && error.response.status === 404) {
          await createCart();
        } else {
          setError('Failed to fetch cart');
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchGames = async () => {
      try {
        const response = await axios.get('/games-api/games/get-all');
        setGames(response.data.data);
      } catch (error) {
        setError('Failed to fetch games');
      }
    };

    const createCart = async () => {
      try {
        const email = localStorage.getItem("email");
        const token = localStorage.getItem('Authorization');
        if (!email || !token) {
          throw new Error('Unauthorized');
        }

        await axios.post(`api/cart/create/${email}`, null, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const response = await axios.get(`/api/cart/view/${email}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        setCart(response.data);
        setError('');
      } catch (error) {
        setError('Failed to create cart');
      }
    };

    fetchCart();
    fetchGames();
  }, []);

  const clearCart = async () => {
    try {
      const email = localStorage.getItem("email");
      const token = localStorage.getItem('Authorization');
      if (!email || !token) {
        throw new Error('Unauthorized');
      }

      await axios.delete(`/api/cart/clear/${email}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      await fetchCart();
      setError('');
    } catch (error) {
      setError('Failed to clear cart');
    }
  };

  const incrementItem = async (itemId: string) => {
    try {
      const email = localStorage.getItem("email");
      const token = localStorage.getItem('Authorization');
      if (!email || !token) {
        throw new Error('Unauthorized');
      }

      await axios.post(`/api/cart/increment`, null, {
        params: { email, itemId },
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      });

      await fetchCart();
      setError('');
    } catch (error) {
      setError('Failed to increment item');
    }
  };

  const decrementItem = async (itemId: string) => {
    try {
      const email = localStorage.getItem("email");
      const token = localStorage.getItem('Authorization');
      if (!email || !token) {
        throw new Error('Unauthorized');
      }

      await axios.post(`/api/cart/decrement`, null, {
        params: { email, itemId },
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      });

      await fetchCart();
      setError('');
    } catch (error) {
      setError('Failed to decrement item');
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const email = localStorage.getItem("email");
      const token = localStorage.getItem('Authorization');
      if (!email || !token) {
        throw new Error('Unauthorized');
      }

      await axios.delete(`/api/cart/remove`, {
        params: { email, itemId },
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      });

      await fetchCart();
      setError('');
    } catch (error) {
      setError('Failed to remove item');
    }
  };

  const fetchCart = async () => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem('Authorization');
    if (!email || !token) {
      throw new Error('Unauthorized');
    }

    const response = await axios.get(`/api/cart/view/${email}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    setCart(response.data);
  };

  const handleCheckout = () => {
    router.push('/pembelian');
  };

  if (loading) return <div>Loading...</div>;

  if (!cart) return <div>No cart data</div>;

  return (
    <div className="flex flex-col items-center py-2 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Keranjang Belanja</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <p className="text-xl mb-4"><strong>Email:</strong> {cart.email}</p>
      <div className="w-full max-w-4xl space-y-4">
        {Object.keys(cart.items).map((itemId) => {
          const game = games.find(game => game.id === itemId);
          if (!game) return null;
          return (
            <div key={itemId} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
              <div>
                <p className="text-lg"><strong>Nama:</strong> {game.nama}</p>
                <p className="text-lg"><strong>Deskripsi:</strong> {game.deskripsi}</p>
                <p className="text-lg"><strong>Harga:</strong> {game.harga}</p>
                <p className="text-lg"><strong>Kategori:</strong> {game.kategori}</p>
                <p className="text-lg"><strong>Stok:</strong> {game.stok}</p>
                <p className="text-lg"><strong>Quantity:</strong> {cart.items[itemId]}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600"
                  onClick={() => {
                    if (cart.items[itemId] < game.stok) {
                      incrementItem(itemId);
                    } else {
                      setError('Tidak bisa menambahkan lebih dari stok yang tersedia');
                    }
                  }}
                >
                  +
                </button>
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded-full hover:bg-yellow-600"
                  onClick={() => decrementItem(itemId)}
                >
                  -
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
                  onClick={() => removeItem(itemId)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-xl mt-6"><strong>Total Price:</strong> {cart.totalPrice}</p>
      <div className="flex space-x-4 mt-6">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
          onClick={clearCart}
        >
          Clear Cart
        </button>
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default KeranjangItem;
