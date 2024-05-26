// src/components/ulasan/CreateUlasan.tsx
import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaStar } from 'react-icons/fa';
import Swal from 'sweetalert2';
import createAxiosInstance from '../../utils/api';

interface Ulasan {
    idUser: string;
    game: string;
    rating: number;
    deskripsi: string;
}

interface CreateUlasanProps {
    game: string;
}

const CreateUlasan = ({ game }: CreateUlasanProps) => {
    const [form, setForm] = useState<Ulasan>({
        idUser: '',
        game: game,
        rating: 0,
        deskripsi: ''
    });

    useEffect(() => {
        setForm((prevForm) => ({ ...prevForm, game }));
    }, [game]);

    const [hoverRating, setHoverRating] = useState<number>(0);

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleStarClick = (rating: number) => {
        setForm({
            ...form,
            rating
        });
    };

    const handleStarMouseEnter = (rating: number) => {
        setHoverRating(rating);
    };

    const handleStarMouseLeave = () => {
        setHoverRating(0);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const axiosInstance = createAxiosInstance('http://34.168.24.170/');
        try {
            await axiosInstance.post('/ulasan/create', form);
            Swal.fire({
                title: 'Success!',
                text: 'Ulasan created successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                router.push('/ulasan'); // Redirect to ulasan page
            });
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Error creating ulasan',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg ml-auto p-4 border rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Create Ulasan</h1>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">User &#39;TEMPORARY NANTI FETCH DARI LOGGED IN USER&#39;</label>
                <input type="text" name="idUser" value={form.idUser} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Rating</label>
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <FaStar
                            key={i}
                            className={`h-8 w-8 cursor-pointer ${i < (hoverRating || form.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                            onClick={() => handleStarClick(i + 1)}
                            onMouseEnter={() => handleStarMouseEnter(i + 1)}
                            onMouseLeave={handleStarMouseLeave}
                        />
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Deskripsi</label>
                <textarea name="deskripsi" value={form.deskripsi} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
        </form>
    );
};

export default CreateUlasan;
