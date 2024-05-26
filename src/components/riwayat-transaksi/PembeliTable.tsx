'use client'

import React, { useEffect, useState } from 'react';
import { RIWAYAT_GET_PEMBELI } from '../../../config/constants';

interface PembeliTableProps {
    userEmail: string
}

interface Game {
    id: string;
    nama: string;
    deskripsi: string;
    harga: number;
    kategori: string;
    penjual_id: string;
}

interface Transaksi {
    id: string;
    games: Game[];
    total_harga: number;
    tanggal_pembayaran: string;
    pembeli_id: string;
}
  
const PembeliTable: React.FC<PembeliTableProps> = ( {userEmail} ) => {
    const [transaksiList, setTransaksiList] = useState<Transaksi[]>([]);
  
    const fetchTransaksiList = async (email: string) => {
      try {
        const response = await fetch(RIWAYAT_GET_PEMBELI(email));
        const data: Transaksi[] = await response.json();
        setTransaksiList(data);
      } catch (error) {
        console.error('Error fetching transaction list:', error);
      }
    };

    fetchTransaksiList(userEmail);
  
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
        <h1 className="text-2xl font-bold mb-4">Transactions</h1>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Games</th>
              <th className="py-2 px-4 border-b">Total Harga</th>
              <th className="py-2 px-4 border-b">Tanggal Transaksi</th>
            </tr>
          </thead>
          <tbody>
            {transaksiList.map((transaksi, index) => (
              <tr key={transaksi.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="py-2 px-4 border-b">
                  <ul className="list-disc pl-4">
                    {transaksi.games.map((game) => (
                      <li key={game.id}>
                        <span className="font-semibold">{game.nama}</span> - {game.penjual_id} - Rp{game.harga} - {game.kategori}
                        <div className="mt-1">{game.deskripsi}</div>
                      </li>                    
                    ))}
                  </ul>
                </td>
                <td className="py-2 px-4 border-b">Rp{transaksi.total_harga}</td>
                <td className="py-2 px-4 border-b">{formatDate(transaksi.tanggal_pembayaran)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  

export default PembeliTable;