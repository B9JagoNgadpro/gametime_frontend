import React, { ReactNode } from 'react';

interface GameCardProps {
    id: string;
    nama: string;
    deskripsi: string;
    harga: number;
    kategori: string;
    children?: ReactNode;
}

const GameCard: React.FC<GameCardProps> = ({ id, nama, deskripsi, harga, kategori, children }) => {
    return (
        <div key={id} data-id={id} className="bg-white p-4 rounded-lg shadow-md relative mb-4">
            <h2 className="text-lg font-bold">{nama}</h2>
            <p className="mt-2">{deskripsi}</p>
            <p className="mt-2">Harga: Rp{harga}</p>
            <p className="mt-2">Kategori: {kategori}</p>
            {children && <div className="mt-4">{children}</div>}
        </div>
    );
};

export default GameCard;
