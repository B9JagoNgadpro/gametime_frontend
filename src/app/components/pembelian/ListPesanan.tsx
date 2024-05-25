"use client"
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Game {
    nama: string;
    quantity: number;
    hargaSatuan: number;
    total: number;
}

interface Keranjang {
    listGames: Game[];
    totalPrice: number;
}

const ListPesanan = () => {
    const router = useRouter();
    const [keranjang, setKeranjang] = useState<Keranjang | null>(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        fetchIsiKeranjang();
    }, []);

    const fetchIsiKeranjang = async () => {
        try {
            const email = localStorage.getItem("email");
            const token = localStorage.getItem('Authorization');
            console.log(email);
            const response = await fetch(`http://34.87.70.230/api/transaksi/display/${email}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data: Keranjang = await response.json();
                setKeranjang(data);
            } else {
                if (response.status === 403) {
                    throw new Error('Forbidden: You do not have access to this Page, please login as pembeli');
                } else {
                    const data: Keranjang = await response.json();
                    console.log(data)
                    throw new Error('Failed to fetch products');
                }
            }
        } catch (error: any) {
            setHasError(true);
            alert(error.message);
        }
    };

    if (hasError) {
        return null;
    }
    if (!keranjang || keranjang.listGames.length === 0) {
        return <p>Keranjang is empty</p>;
    }
    return (
        <>
            {keranjang && (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Game</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kuantitas</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga Satuan</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total (per item)</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {keranjang.listGames.map((game) => (
                            <tr key={game.nama}>
                                <td className="px-6 py-4 whitespace-nowrap">{game.nama}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{game.quantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{game.hargaSatuan}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{game.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default ListPesanan;
