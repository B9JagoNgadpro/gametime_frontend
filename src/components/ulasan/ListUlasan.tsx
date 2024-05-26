// src/components/ulasan/ListUlasan.tsx
import { useEffect, useState } from 'react';
import axios from '../../utils/api';
import { FaStar } from 'react-icons/fa';

interface Ulasan {
    id: string;
    idUser: string;
    game: string;
    rating: number;
    deskripsi: string;
    date: string;
}

interface ListUlasanProps {
    idUser: string;
}

const ListUlasan = ({ idUser }: ListUlasanProps) => {
    const [ulasans, setUlasans] = useState<Ulasan[]>([]);

    useEffect(() => {
        const fetchUlasans = async () => {
            try {
                const response = await axios.get<Ulasan[]>(`http://localhost:8080/ulasan/user/${idUser}`);
                setUlasans(response.data);
            } catch (error) {
                console.error('Error fetching ulasans:', error);
            }
        };
        if (idUser) {
            fetchUlasans();
        }
    }, [idUser]);

    const renderStars = (rating: number) => {
        return (
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <FaStar
                        key={i}
                        className={`h-5 w-5 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="grid gap-4">
            {ulasans.map((ulasan) => (
                <div key={ulasan.id} className="bg-white p-4 rounded-lg shadow-md">
                    <div className="text-lg font-bold">{ulasan.game}</div>
                    <div className="mt-2">{renderStars(ulasan.rating)}</div>
                    <div className="mt-2">{ulasan.deskripsi}</div>
                    <div className="text-sm text-gray-600 mt-2">{ulasan.date}</div>
                </div>
            ))}
        </div>
    );
};

export default ListUlasan;