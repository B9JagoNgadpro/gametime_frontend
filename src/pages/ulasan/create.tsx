// src/pages/ulasan/create.tsx
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import CreateUlasan from '@/components/ulasan/CreateUlasan';
import GameCard from '@/components/ulasan/GameCard';
import Layout from '../../layout/layout';

interface Game {
    id: string;
    nama: string;
    deskripsi: string;
    harga: number;
    kategori: string;
}

const CreateUlasanPage = () => {
    const router = useRouter();
    const { gameId } = router.query;

    const [game, setGame] = useState<Game | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('Authorization');
        setToken(storedToken);

        if (gameId && storedToken) {
            fetchGameDetails(gameId as string, storedToken);
        }
    }, [gameId]);

    const fetchGameDetails = async (id: string, authToken: string) => {
        try {
            const response = await fetch(`http://34.87.70.230/api/games/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const gameData = await response.json();
            setGame(gameData.data);
        } catch (error) {
            console.error('Error fetching game details:', error);
        }
    };

    return (
        <Layout>
            <div className="flex flex-col md:flex-row p-4 space-x-4 justify-center">
                <div className="md:w-2/3 max-w-md">
                    <CreateUlasan game={gameId as string} />
                </div>
                <div className="md:w-1/3 max-w-xs">
                    {game && (
                        <GameCard
                            id={game.id}
                            nama={game.nama}
                            deskripsi={game.deskripsi}
                            harga={game.harga}
                            kategori={game.kategori}
                        />
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default CreateUlasanPage;
