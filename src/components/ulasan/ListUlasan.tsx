// src/components/ulasan/ListUlasan.tsx
import { useEffect, useState } from 'react';
import { FaStar, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import createAxiosInstance from '../../utils/api';

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
    const axiosInstance = createAxiosInstance('http://34.168.24.170/');

    useEffect(() => {
        const fetchUlasans = async () => {
            try {
                const response = await axiosInstance.get<Ulasan[]>(`/ulasan/user/${idUser}`);
                setUlasans(response.data);
            } catch (error) {
                console.error('Error fetching ulasans:', error);
            }
        };
        if (idUser) {
            fetchUlasans();
        }
    }, [idUser]);

    const handleDelete = async (idUlasan: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosInstance.delete(`/ulasan/delete/${idUlasan}`);
                    setUlasans((prevUlasans) => prevUlasans.filter(ulasan => ulasan.id !== idUlasan));
                    Swal.fire(
                        'Deleted!',
                        'Ulasan has been deleted.',
                        'success'
                    );
                } catch (error) {
                    Swal.fire(
                        'Error!',
                        'There was an error deleting the ulasan.',
                        'error'
                    );
                }
            }
        });
    };

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
                <div key={ulasan.id} className="bg-white p-4 rounded-lg shadow-md relative">
                    <div className="text-lg font-bold">{ulasan.game}</div>
                    <div className="mt-2">{renderStars(ulasan.rating)}</div>
                    <div className="mt-2">{ulasan.deskripsi}</div>
                    <div className="text-sm text-gray-600 mt-2">{ulasan.date}</div>
                    <button 
                        onClick={() => handleDelete(ulasan.id)} 
                        className="absolute bottom-4 right-4 text-red-500 hover:text-red-700">
                        <FaTrashAlt />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ListUlasan;
