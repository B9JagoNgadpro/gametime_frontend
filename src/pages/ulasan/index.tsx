import ListUlasan from '@/components/ulasan/ListUlasan';
import Layout from '../../layout/layout';
import GameCard from '@/components/ulasan/GameCard';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Game {
  id: string;
  nama: string;
  deskripsi: string;
  harga: number;
  kategori: string;
}

interface BoughtGame {
  idGame: string;
  idUser: string;
  reviewed: boolean;
}

const HomeUlasan: React.FC = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedToken = localStorage.getItem('Authorization');
    setEmail(storedEmail);
    setToken(storedToken);

    if (storedEmail && storedToken) {
      fetchBoughtGames(storedEmail, storedToken);
    }
  }, []);

  const fetchBoughtGames = async (userEmail: string, authToken: string) => {
    try {
      const response = await fetch(`http://34.168.24.170/bought-games/user/${userEmail}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const boughtGames: BoughtGame[] = await response.json();

      // Fetch game details for each bought game
      const gameDetailsPromises = boughtGames.map(async (boughtGame) => {
        const gameResponse = await fetch(`http://34.87.70.230/api/games/${boughtGame.idGame}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!gameResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const gameData = await gameResponse.json();
        console.log(gameData)
        return gameData.data;
      });

      const gameDetails = await Promise.all(gameDetailsPromises);
      setGames(gameDetails);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center py-2 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold mb-8">Selamat Datang di Halaman Ulasan, {email}</h1>
        <div className="flex flex-row w-full max-w-7xl space-x-8">
          <div className="w-1/2 space-y-4">
            <h1 className="text-2xl font-bold mb-4">Your Games</h1>
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
            <ListUlasan idUser={email || ''} /> 
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomeUlasan;
