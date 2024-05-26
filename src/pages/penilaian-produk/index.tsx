// src/pages/index.tsx
import FetchGameUlasan from '@/components/penilaian-produk/FetchGameUlasan';
import Layout from '../../layout/layout';
import React from 'react';
import CreateTanggapan from '@/components/penilaian-produk/CreateTanggapan';
import ListTanggapan from '@/components/penilaian-produk/ListTanggapan';

const HomePenilaian: React.FC = () => {
    const games = [
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

    return (
        <Layout>
            <div className="flex flex-col items-center py-2 bg-gray-100 min-h-screen">
                <h1 className="text-4xl font-bold mb-8">Penilaian Produk</h1>
                <div className="flex flex-row w-full max-w-7xl space-x-8">
                    <div className="w-1/2 space-y-4">
                        <h1 className="text-2xl font-bold mb-4">Product Reviews</h1>
                        {games.map(game => (
                            <div key={game.id} className="mb-4">
                                <h2 className="text-xl font-semibold">{game.nama}</h2>
                                <FetchGameUlasan gameId={game.id} />
                            </div>
                        ))}
                    </div>
                    <div className="w-1/2 space-y-4">
                        <h1 className="text-2xl font-bold mb-4">Your Response</h1>
                        <ListTanggapan penjualId={"penjual1"} />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HomePenilaian;
