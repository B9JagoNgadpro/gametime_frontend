import Head from 'next/head';
import { Container, Typography } from '@mui/material';
import Layout from '../../layout/layout';

export default function riwayatTransaksi() {
  return (
    <Layout>
        <Container maxWidth="sm">
        <Head>
            <title>Riwayat Transaksi</title>
        </Head>
        <Typography variant="h4" component="h1" gutterBottom>
            Riwayat Transaksi
        </Typography>
        {/* <Typography variant="h4" component="h1" gutterBottom>
            Form untuk mendaftarkan Game Baru
        </Typography> */}
        </Container>
    </Layout>  
  );
}
