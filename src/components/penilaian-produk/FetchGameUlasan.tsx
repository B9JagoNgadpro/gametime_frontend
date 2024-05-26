// src/components/ulasan/FetchGameUlasan.tsx
import { useEffect, useState } from 'react';
import axios from '../../utils/api';
import ListPenilaian from './ListPenilaian';
import createAxiosInstance from '../../utils/api';

interface Ulasan {
    id: string;
    idUser: string;
    game: string;
    rating: number;
    deskripsi: string;
    date: string;
}

interface FetchGameUlasanProps {
    gameId: string;
}

const FetchGameUlasan = ({ gameId }: FetchGameUlasanProps) => {
    const [ulasans, setUlasans] = useState<Ulasan[]>([]);
    const [loading, setLoading] = useState(true);
    const axiosInstance = createAxiosInstance('http://34.168.24.170/');
    
    useEffect(() => {
        const fetchUlasans = async () => {
            try {
                const response = await axiosInstance.get<Ulasan[]>(`ulasan/game/${gameId}`);
                setUlasans(response.data);
            } catch (error) {
                console.error('Error fetching ulasans:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUlasans();
    }, [gameId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <ListPenilaian ulasans={ulasans} />;
};

export default FetchGameUlasan;
