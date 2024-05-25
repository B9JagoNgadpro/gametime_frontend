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

    // Fetch dari game API nantinya
    const games: Game[] = [
        {
            id: 'game1',
            nama: 'Game Satu',
            deskripsi: 'Deskripsi singkat game satu.',
            harga: 50000,
            kategori: 'Aksi'
        },
        {
            id: 'game2',
            nama: 'Game Dua',
            deskripsi: 'Deskripsi singkat game dua.',
            harga: 75000,
            kategori: 'Petualangan'
        },
        {
            id: 'game3',
            nama: 'Game Tiga',
            deskripsi: 'Deskripsi singkat game tiga.',
            harga: 100000,
            kategori: 'Strategi'
        }
    ];

    useEffect(() => {
        if (gameId) {
            const selectedGame = games.find(game => game.id === gameId);
            setGame(selectedGame || null);
        }
    }, [gameId]);

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