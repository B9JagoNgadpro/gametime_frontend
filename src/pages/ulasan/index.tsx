// src/pages/index.tsx
import ListUlasan from '@/components/ulasan/ListUlasan';
import Layout from '../../layout/layout';
import GameCard from '@/components/ulasan/GameCard';
import Link from 'next/link';
import React from 'react';

const HomeUlasan: React.FC = () => {
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
        <h1 className="text-4xl font-bold mb-8">Selamat Datang di Halaman Ulasan, User1 'NANTI FETCH DARI LOGGED IN USER'</h1>
        <div className="flex flex-row w-full max-w-7xl space-x-8">
          <div className="w-1/2 space-y-4">
            <h1 className="text-2xl font-bold mb-4">Your Games 'NANTI FETCH DARI RIWAYAT'</h1>
            {games.map(game => (
              <GameCard 
                key={game.id}
                id={game.id}
                nama={game.nama}
                deskripsi={game.deskripsi}
                harga={game.harga}
                kategori={game.kategori}
              >
                <Link href={`/ulasan/create?gameId=${game.id}`}>
                  <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
                    Buat Ulasan
                  </button>
                </Link>
              </GameCard>
            ))}
          </div>
          <div className="w-1/2">
            <h1 className="text-2xl font-bold mb-4">Your Reviews</h1>
            <ListUlasan idUser={"user1"} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomeUlasan;