import Link from 'next/link';
import { FaStar } from 'react-icons/fa';

interface Ulasan {
    id: string;
    idUser: string;
    game: string;
    rating: number;
    deskripsi: string;
    date: string;
}

interface ListPenilaianProps {
    ulasans: Ulasan[];
}

const ListPenilaian = ({ ulasans }: ListPenilaianProps) => {

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
                    <Link href={`/penilaian-produk/create?ulasanId=${ulasan.id}`}>
                        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
                            Tanggapi
                        </button>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default ListPenilaian;
