"use client";
import { useState } from 'react';
import axios from 'axios';
import GameList from '../../components/pencarian/GameList'

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('');
    const [games, setGames] = useState([]);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setSearched(true);
        try {
            const response = await axios.get('http://34.87.70.230/api/games/filter', {
                params: {
                    name: query,
                    category: category
                },
            });
            setGames(response.data);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 dark:bg-gray-900 dark:text-white">
            <h1 className="text-4xl font-bold mb-4">Search Games</h1>
            <form onSubmit={handleSearch} className="mb-4">
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by name"
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Filter by category"
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit" className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
                        Search
                    </button>
                </div>
            </form>
            <GameList games={games} searched={searched} />
        </div>
    );
};

export default SearchPage;