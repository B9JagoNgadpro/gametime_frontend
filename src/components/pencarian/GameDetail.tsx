"use client";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const GameDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [game, setGame] = useState<any>(null);

    useEffect(() => {
        if (id) {
            const fetchGame = async () => {
                try {
                    // const response = await axios.get(`http://localhost:8080/api/games/${id}`);
                    const response = await axios.get(`http://34.87.89.120/api/games/${id}`);
                    setGame(response.data);
                } catch (error) {
                    console.error('Error fetching game:', error);
                }
            };
            fetchGame();
        }
    }, [id]);

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
            </div>
        </div>
    );
};

export default GameDetail;