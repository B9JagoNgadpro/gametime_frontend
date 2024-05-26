import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../layout/layout';
import CreateTanggapan from '@/components/penilaian-produk/CreateTanggapan';

const CreatePage: React.FC = () => {
    const router = useRouter();
    const { ulasanId } = router.query;

    return (
        <Layout>
            <div className="flex flex-col items-center py-2 bg-gray-100 min-h-screen">
                <h1 className="text-4xl font-bold mb-8">Create Tanggapan</h1>
                <div className="w-full max-w-3xl">
                    <CreateTanggapan ulasan={ulasanId as string} />
                </div>
            </div>
        </Layout>
    );
};

export default CreatePage;
