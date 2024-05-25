"use client";
import { useState } from 'react';
import axios from 'axios';
import GameList from '../components/GameList';
import GameSearchForm from '../components/GameSearchForm';
import { SearchFilters } from '../types';

const HomePage = () => {
    const [games, setGames] = useState([]);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (filters: SearchFilters) => {
        setSearched(true);
        try {
            const response = await axios.get('http://localhost:8080/api/games/filter', {
                params: {
                    name: filters.name,
                    category: filters.category,
                    minPrice: filters.minPrice,
                    maxPrice: filters.maxPrice,
                },
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
                <GameSearchForm onSearch={handleSearch} />
                <GameList games={games} searched={searched} />
            </div>
        </div>
    );
};

export default HomePage;