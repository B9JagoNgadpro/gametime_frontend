'use client'

import React, { useEffect, useState } from 'react';
import { RIWAYAT_GET_PENJUAL } from '../../../config/constants';

interface PenjualTableProps {
    userEmail: string
}

interface Transaksi {
    transaksi_id: string;
    game_nama: string;
    game_harga: number;
    tanggal_pembayaran: string;
    pembeli_id: string;
}

const PenjualTable: React.FC<PenjualTableProps> = ({ userEmail }) => {
    const [transaksiList, setTransaksiList] = useState<Transaksi[]>([]);

    const fetchTransaksiList = async (email: string) => {
        try {
            const response = await fetch(RIWAYAT_GET_PENJUAL(email));
            const data: Transaksi[] = await response.json();
            setTransaksiList(data);
        } catch (error) {
            console.error('Error fetching transaction list:', error);
        }
    };

    useEffect(() => {
        fetchTransaksiList(userEmail);
    }, [userEmail]);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };
        return new Date(dateString).toLocaleString('en-GB', options);
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-4">Transactions for {userEmail}</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Game Name</th>
                        <th className="py-2 px-4 border-b">Game Price</th>
                        <th className="py-2 px-4 border-b">Payment Date</th>
                        <th className="py-2 px-4 border-b">Buyer ID</th>
                    </tr>
                </thead>
                <tbody>
                    {transaksiList.map((transaksi, index) => (
                        <tr key={`${transaksi.transaksi_id}-${index}`} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                            <td className="py-2 px-4 border-b">{transaksi.game_nama}</td>
                            <td className="py-2 px-4 border-b">Rp{transaksi.game_harga}</td>
                            <td className="py-2 px-4 border-b">{formatDate(transaksi.tanggal_pembayaran)}</td>
                            <td className="py-2 px-4 border-b">{transaksi.pembeli_id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PenjualTable;
