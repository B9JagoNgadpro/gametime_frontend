import Link from 'next/link';

interface GameItemProps {
    game: {
        id: string;
        nama: string;
        deskripsi: string;
        harga: number;
        kategori: string;
        stok: number;
    };
}

const GameItem: React.FC<GameItemProps> = ({ game }) => {
    return (
        <Link href={`/pencarian/game/${game.id}`} className="card">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 dark:bg-gray-700">
                <h3 className="text-xl font-semibold mb-2">{game.nama}</h3>
                <p className="mb-2">{game.deskripsi}</p>
                <p className="text-md mb-2">Harga: <span className="font-semibold">{game.harga}</span></p>
                <p className="text-md mb-2">Kategori: <span className="font-semibold">{game.kategori}</span></p>
                <p className="text-md">Stok: <span className="font-semibold">{game.stok}</span></p>
            </div>
        </Link>
    );
};

export default GameItem;