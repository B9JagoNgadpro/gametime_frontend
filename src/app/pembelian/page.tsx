import ListPesanan from "../components/pembelian/ListPesanan";
import NamaPembeli from "../components/pembelian/NamaPembeli"

import { useState, useEffect } from 'react';



const Pembelian= ()=>{
    return(
        <>
            <h1> Game Time</h1>
            <NamaPembeli/>
            <ListPesanan/>
        </>
        

    )
   
};
export default Pembelian;