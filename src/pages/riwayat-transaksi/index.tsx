'use client'

import Head from 'next/head';
import { Container, Typography } from '@mui/material';
import Layout from '../../layout/layout';
import PembeliTable from '@/components/riwayat-transaksi/PembeliTable';
import PenjualTable from '@/components/riwayat-transaksi/PenjualTable';


export default function riwayatTransaksi() {
  let state = "pembeli";
  let userEmail = "b@gmail.com";

  return (
    <Layout>
        <Container maxWidth="sm">
        <Head>
            <title>Riwayat Transaksi</title>
        </Head>
        <Typography variant="h4" component="h1" gutterBottom>
            Riwayat Transaksi
        </Typography>
        </Container>
        {state == "pembeli" ? <PembeliTable userEmail={userEmail} /> : <PenjualTable />}
    </Layout>  
  );
}
