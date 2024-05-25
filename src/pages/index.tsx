"use client";
import { useState } from 'react';
import axios from 'axios';
import GameList from '../components/GameList';

const HomePage = () => {
    const [query, setQuery] = useState('');
    const [games, setGames] = useState([]);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setSearched(true);
        try {
        const response = await axios.get('http://localhost:8080/api/games', {
            params: { name: query },
        });
        setGames(response.data);
        } catch (error) {
        console.error('Error fetching games:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 dark:bg-gray-900 dark:text-white">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold mb-4 text-center">Search Games</h1>
            <form onSubmit={handleSearch} className="mb-4 flex">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name"
                className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors duration-300">
                Search
            </button>
            </form>
            <GameList games={games} searched={searched} />
        </div>
        </div>
    );
};

export default HomePage;