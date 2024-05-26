// src/pages/ulasan/user/[idUser].tsx
import { useRouter } from 'next/router';
import Layout from '../../../layout/layout';
import ListUlasan from '../../../components/ulasan/ListUlasan';

const ListUlasanPage = () => {
    const router = useRouter();
    const { idUser } = router.query;

    return (
        <Layout>
            <ListUlasan idUser={idUser as string} />
        </Layout>
    );
};

export default ListUlasanPage;