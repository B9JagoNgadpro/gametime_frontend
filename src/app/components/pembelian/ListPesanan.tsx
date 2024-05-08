"use client"
interface Keranjang{
    // nama: string,
    // quantity: number,
    // hargaSatuan: number,
    // total: number

    userId: number,
    id: number,
    title: string,
    body: string
}

import { useState, useEffect } from 'react';
const ListPesanan = ()=>{
    const [keranjang, setKeranjang] = useState<Keranjang[]>([]);

    // Fetch products data from API
    useEffect(() => {
        fetchIsiKeranjang();
    }, []);

    const fetchIsiKeranjang = async () => {
        try {
            // Fetch data from your API endpoint
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data: Keranjang[] = await response.json();
            // Update state with fetched products
            setKeranjang(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    return (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Body</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {keranjang.map((game) => (
              <tr key={game.id}>
                <td className="px-6 py-4 whitespace-nowrap">{game.userId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{game.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{game.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
};
export default ListPesanan