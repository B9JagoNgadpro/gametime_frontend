import CheckOut from "../../components/pembelian/CheckOut";
import ListPesanan from "../../components/pembelian/ListPesanan";

import Logout from "../../components/logout/Logout";
import Layout from '../../layout/layout';

const Pembelian= ()=>{
    return(
        <Layout>
            <h1> Game Time</h1>
       
            <ListPesanan/>
            <CheckOut/>
            <Logout/>
        </Layout>
        

    )
   
};
export default Pembelian;