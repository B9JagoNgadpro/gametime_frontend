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
        <Link href={`/game/${game.id}`} className="card">
        <div>
            <h3>{game.nama}</h3>
            <p>{game.deskripsi}</p>
            <p>Harga: {game.harga}</p>
            <p>Kategori: {game.kategori}</p>
            <p>Stok: {game.stok}</p>
        </div>
        </Link>
    );
};

export default GameItem;