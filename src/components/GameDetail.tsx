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
            const response = await axios.get(`http://localhost:8080/api/games/${id}`);
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
        <h1 className="text-4xl font-bold mb-4">{game.nama}</h1>
        <p>{game.deskripsi}</p>
        <p>Price: {game.harga}</p>
        <p>Category: {game.kategori}</p>
        <p>Stock: {game.stok}</p>
        </div>
    );
};

export default GameDetail;