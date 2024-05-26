"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import GameList from '../../components/pencarian/GameList';
import GameSearchForm from '../../components/pencarian/GameSearchForm';

const SearchPage: React.FC = () => {
    const [games, setGames] = useState([]);
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        document.body.classList.add('light-mode');
    }, []);

    const handleSearch = async ({ name, category }: { name: string; category: string }) => {
        setSearched(true);

        const params: any = {};
        if (name.trim() !== '') {
            params.nama = name;
        }
        if (category.trim() !== '') {
            params.kategori = category;
        }

        if (Object.keys(params).length === 0) {
            console.error('Please provide at least one search criteria.');
            return;
        }

        console.log('Sending request with params:', params);

        try {
            const response = await axios.get('http://34.87.70.230/api/games/get', { params });
            console.log('Response data:', response.data);
            setGames(response.data.data);
        } catch (error: any) {
            console.error('Error fetching games:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-white p-8 text-black">
            <h1 className="text-4xl font-bold mb-4">Search Games</h1>
            <div className="max-w-lg mx-auto">
                <GameSearchForm onSearch={handleSearch} />
                <GameList games={games} searched={searched} />
            </div>
        </div>
    );
};

export default SearchPage;