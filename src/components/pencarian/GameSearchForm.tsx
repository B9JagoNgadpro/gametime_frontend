import React, { useState } from 'react';

interface GameSearchFormProps {
    onSearch: (searchParams: { name: string; category: string }) => void;
}

const GameSearchForm: React.FC<GameSearchFormProps> = ({ onSearch }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch({ name, category });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="mb-4">
                <label htmlFor="name" className="block text-white mb-2">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-600 rounded-lg"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="category" className="block text-white mb-2">Category:</label>
                <input
                    type="text"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border border-gray-600 rounded-lg"
                />
            </div>
            <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Search
            </button>
        </form>
    );
};

export default GameSearchForm;