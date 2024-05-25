import CheckOut from "../components/pembelian/CheckOut";
import ListPesanan from "../components/pembelian/ListPesanan";

import Logout from "../components/logout/Logout";

const Pembelian= ()=>{
    return(
        <>
            <h1> Game Time</h1>
       
            <ListPesanan/>
            <CheckOut/>
            <Logout/>
        </>
        

    )
   
};
export default Pembelian;