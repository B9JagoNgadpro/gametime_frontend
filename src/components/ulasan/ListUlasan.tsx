import { useEffect, useState } from 'react';
import { FaStar, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import createAxiosInstance from '../../utils/api';
import GameCard from './GameCard';

export interface Ulasan {
    id: string;
    idUser: string;
    game: string;
    rating: number;
    deskripsi: string;
    date: string;
}

interface ListUlasanProps {
    idUser: string;
    onUlasanDeleted: () => void; // New prop
}

const ListUlasan = ({ idUser, onUlasanDeleted }: ListUlasanProps) => {
    const [ulasans, setUlasans] = useState<Ulasan[]>([]);
    const [gameDetails, setGameDetails] = useState<{ [key: string]: { nama: string, deskripsi: string, harga: number, kategori: string } }>({});
    const axiosInstance1 = createAxiosInstance('http://34.168.24.170/');
    const axiosInstance2 = createAxiosInstance('http://34.87.70.230/');

    useEffect(() => {
        const fetchUlasans = async () => {
            try {
                const response = await axiosInstance1.get<Ulasan[]>(`/ulasan/user/${idUser}`);
                const ulasanData = response.data;
                setUlasans(ulasanData);

                // Fetch game details for each game in the ulasan list
                const gameDetailsPromises = ulasanData.map(async (ulasan) => {
                    const gameResponse = await axiosInstance2.get(`/api/games/${ulasan.game}`);
                    const gameData = gameResponse.data.data;
                    return { [ulasan.game]: gameData };
                });

                const gameDetailsArray = await Promise.all(gameDetailsPromises);
                const gameDetailsMap = gameDetailsArray.reduce((acc, curr) => ({ ...acc, ...curr }), {});
                setGameDetails(gameDetailsMap);
            } catch (error) {
                console.error('Error fetching ulasans:', error);
            }
        };
        if (idUser) {
            fetchUlasans();
        }
    }, [idUser]);

    const handleDelete = async (idUlasan: string, idGame: string) => {
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
                    // Delete ulasan
                    await axiosInstance1.delete(`/ulasan/delete/${idUlasan}`);
                    
                    // Mark game as unreviewed
                    await axiosInstance1.patch(`/bought-games/unReviewed/user/${idUser}`, { idGame });

                    setUlasans((prevUlasans) => prevUlasans.filter(ulasan => ulasan.id !== idUlasan));
                    Swal.fire(
                        'Deleted!',
                        'Ulasan has been deleted.',
                        'success'
                    );

                    // Call the onUlasanDeleted prop to refresh parent component
                    onUlasanDeleted();

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
            {ulasans.length === 0 ? (
                <div className="text-center text-gray-500">Belum ada ulasan</div>
            ) : (
                ulasans.map((ulasan) => (
                    <GameCard
                        key={ulasan.id}
                        id={ulasan.game}
                        nama={gameDetails[ulasan.game]?.nama || ''}
                        deskripsi={gameDetails[ulasan.game]?.deskripsi || ''}
                        harga={gameDetails[ulasan.game]?.harga || 0}
                        kategori={gameDetails[ulasan.game]?.kategori || ''}
                    >
                        <div className="mt-4 border-t-2 pt-4">
                            <div className="text-lg font-bold">
                                {ulasan.idUser} <span className="text-sm text-gray-600">∙ {ulasan.date}</span>
                            </div>
                            <div className="mt-2">{renderStars(ulasan.rating)}</div>
                            <div className="mt-2">{ulasan.deskripsi}</div>
                            <button
                                onClick={() => handleDelete(ulasan.id, ulasan.game)}
                                className="absolute bottom-4 right-4 mt-2 text-red-500 hover:text-red-700">
                                <FaTrashAlt />
                            </button>
                        </div>
                    </GameCard>
                ))
            )}
        </div>
    );
};

export default ListUlasan;
