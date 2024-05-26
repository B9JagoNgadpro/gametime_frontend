// pages/index.js

import Head from 'next/head';
import Form from '../../components/penjualan/Form';
import { Container, Typography } from '@mui/material';
import Layout from '../../layout/layout';

export default function penjualan() {
  return (
    <Layout>
        <Container maxWidth="sm">
        <Head>
            <title> Penjualan</title>
        </Head>
        <Typography variant="h4" component="h1" gutterBottom>
            Form untuk mendaftarkan Game Baru
        </Typography>
        <Form />
        </Container>
    </Layout>  
  );
}
