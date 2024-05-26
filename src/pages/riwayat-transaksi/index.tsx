'use client'

import Head from 'next/head';
import { Container, Typography, Button } from '@mui/material';
import Layout from '../../layout/layout';
import PembeliTable from '@/components/riwayat-transaksi/PembeliTable';
import PenjualTable from '@/components/riwayat-transaksi/PenjualTable';
import { useEffect, useState } from 'react';

const RiwayatTransaksi: React.FC = () => {
  const [email, setEmail] = useState<string | null>('');
  const [token, setToken] = useState<string | null>('');
  const [state, setState] = useState<'penjual' | 'pembeli'>('penjual');

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedToken = localStorage.getItem('Authorization');

    setEmail(storedEmail);
    setToken(storedToken);
  }, []);

  const toggleState = () => {
    setState(prevState => (prevState === 'penjual' ? 'pembeli' : 'penjual'));
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <Head>
          <title>Riwayat Transaksi</title>
        </Head>
        <Typography variant="h4" component="h1" gutterBottom>
          Riwayat Transaksi
        </Typography>
        <Button variant="contained" color="primary" onClick={toggleState}>
          Switch to {state === 'penjual' ? 'Pembeli' : 'Penjual'}
        </Button>
      </Container>
      {state === "pembeli" ? <PembeliTable userEmail={email || ''} /> : <PenjualTable userEmail={email || ''} />}
    </Layout>
  );
}

export default RiwayatTransaksi;
