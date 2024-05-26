// src/pages/index.tsx
import Layout from '../layout/layout';
import Link from 'next/link';
import React from 'react';

const UlasanHome: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">Selamat Datang di Halaman Utama GameTime</h1>
        <div className="space-x-4">
          <Link href="/ulasan">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
              Ulasan
            </button>
          </Link>
          <Link href="/keranjang/raflimahesa">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
              Keranjang
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default UlasanHome;