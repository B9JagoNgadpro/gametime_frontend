import KeranjangItem from "../../components/keranjang/KeranjangItem";
import Logout from "../../components/logout/Logout";
import Layout from '../../layout/layout';

const KeranjangPage = () => {
    return (
        <Layout>
            <KeranjangItem />
            <Logout />
        </Layout>
    );
};

export default KeranjangPage;
