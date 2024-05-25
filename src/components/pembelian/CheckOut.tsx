"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const CheckOut = () => {
    const router = useRouter();
  

    const handleCheckOutClick = async() => {
        const email = localStorage.getItem("email")
        const token = localStorage.getItem('Authorization');
        const response = await fetch('http://34.87.70.230/api/transaksi/'+email, {
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            }
        });
        
        try{
          
            if (response.status === 201) {
                const data = await response.json();
                alert("Transaksi Berhasil")
            } 
            else {
                const data = await response.json();
                alert(data.errors);
            }
        }
        catch(error){
            console.error('Error melakukan pembelian: ', error);
        }
    };

    return(
        <p className="text-center text-sm">
            <button onClick={handleCheckOutClick} className="text-blue-500 hover:underline focus:outline-none">Check Out</button>
        </p>
    )
}

export default CheckOut;
