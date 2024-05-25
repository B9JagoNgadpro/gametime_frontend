import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const GameDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [game, setGame] = useState<any>(null);

    useEffect(() => {
        if (id) {
            console.log(`Rendering GameDetail for ID: ${id}`);
            const fetchGame = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/games/${id}`);
                    setGame(response.data);
                    console.log('Game data:', response.data);
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
            <p className="mb-4">{game.deskripsi}</p>
            <p className="mb-2"><strong>Price:</strong> {game.harga}</p>
            <p className="mb-2"><strong>Category:</strong> {game.kategori}</p>
            <p className="mb-2"><strong>Stock:</strong> {game.stok}</p>
        </div>
    );
};

export default GameDetail;
// f