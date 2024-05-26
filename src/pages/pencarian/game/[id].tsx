"use client";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const GameDetailPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [game, setGame] = useState<any>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            const fetchGame = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/games/${id}`);
                    setGame(response.data);
                } catch (error) {
                    console.error('Error fetching game:', error);
                }
            };
            fetchGame();
        }
    }, [id]);

    const addToCart = async () => {
        try {
            const email = localStorage.getItem("email");
            const token = localStorage.getItem('Authorization');
            if (!email || !token) {
                throw new Error('Unauthorized');
            }

            await axios.post(`/api/cart/increment`, null, {
                params: { email, itemId: id },
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            });

            setError('');
            alert('Game added to cart');
        } catch (error) {
            console.error('Error adding to cart:', error);
            setError('Failed to add to cart');
        }
    };

    if (!game) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8 dark:bg-gray-900 dark:text-white">
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-4">{game.nama}</h1>
                <p className="text-lg mb-4">{game.deskripsi}</p>
                <p className="text-md mb-2">Price: <span className="font-semibold">{game.harga}</span></p>
                <p className="text-md mb-2">Category: <span className="font-semibold">{game.kategori}</span></p>
                <p className="text-md mb-2">Stock: <span className="font-semibold">{game.stok}</span></p>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded-full mt-4 hover:bg-green-600"
                    onClick={addToCart}
                >
                    Add to Cart
                </button>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    );
};

export default GameDetailPage;
