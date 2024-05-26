'use client'
import React from 'react';
import Link from 'next/link';
import Layout from '../../layout/layout';

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-8">Welcome to Game Time</h1>
        <div className="space-y-4">
          <Link href="/pembelian" className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
              Pembelian
          </Link>
          <Link href="/pencarian" className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
              Pencarian
          </Link>
          <Link href="/penilaian-produk" className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
              Penilaian Produk
          </Link>
          <Link href="/penjualan" className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
              Penjualan
          </Link>
          <Link href="/riwayat-transaksi" className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
              Riwayat Transaksi
          </Link>
          <Link href="/ulasan" className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
              Ulasan
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
