"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const CheckOut = () => {
    const router = useRouter();
    const email = localStorage.getItem("email")
    const token = localStorage.getItem('Authorization');

    const handleCheckOutClick = async() => {
        const response = await fetch('http://34.87.70.230/api/transaksi/'+email, {
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            }
        });
        
        try{
            const data = await response.json();
            if (response.ok) {
            alert("Transaksi Berhasil")
            } 
            else {
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
