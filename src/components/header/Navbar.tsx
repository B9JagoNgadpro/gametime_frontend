'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem('email');
    setIsLoggedIn(!!email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('Authorization');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <nav className="bg-blue-500 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Game Time</h1>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link href="/pembelian" className="text-white">Pembelian</Link>
              <Link href="/pencarian" className="text-white">Pencarian</Link>
              <Link href="/penilaian-produk" className="text-white">Penilaian Produk</Link>
              <Link href="/penjualan" className="text-white">Penjualan</Link>
              <Link href="/riwayat-transaksi" className="text-white">Riwayat Transaksi</Link>
              <Link href="/ulasan" className="text-white">Ulasan</Link>
              <button 
                onClick={handleLogout} 
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
                Login
              </Link>
              <Link href="/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
