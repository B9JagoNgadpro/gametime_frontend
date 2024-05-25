"use client";

import { useState } from 'react';
import axios from 'axios';
import GameList from '../components/GameList'

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [games, setGames] = useState([]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:8080/api/games/filter', {
                params: {
                    name: query
                }
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
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by name"
                    className="p-2 border border-gray-300 rounded mr-2"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                    Search
                </button>
            </form>
            <GameList games={games} />
        </div>
    );
};

export default SearchPage;