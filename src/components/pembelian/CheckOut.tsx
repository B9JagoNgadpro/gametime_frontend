"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const CheckOut = () => {
    const router = useRouter();

    const handleCheckOutClick = async() => {
        const email = localStorage.getItem("email")
        const token = localStorage.getItem('Authorization');
        
        try {
            // First fetch request
            const response = await fetch('http://34.87.70.230/api/transaksi/'+email, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            
            if (response.status === 201) {
                const data = await response.json();
                alert("Transaksi Berhasil")

                // Second fetch request to the specified endpoint
                const userId = email; // Assuming userId is the email
                const secondResponse = await fetch('http://34.168.24.170/bought-games/input/' + userId, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (secondResponse.ok) {
                    alert("Data successfully posted to the second endpoint");
                } else {
                    const secondData = await secondResponse.json();
                    alert("Failed to post data to the second endpoint: " + secondData.errors);
                }
            } else {
                const data = await response.json();
                alert(data.errors);
            }
        } catch(error) {
            console.error('Error performing the checkout: ', error);
        }
    };

    return (
        <p className="text-center text-sm">
            <button onClick={handleCheckOutClick} className="text-blue-500 hover:underline focus:outline-none">Check Out</button>
        </p>
    );
}

export default CheckOut;
