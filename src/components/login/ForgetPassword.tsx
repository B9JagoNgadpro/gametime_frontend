"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const ForgetPassword = () => {
    const router = useRouter();

    const handleForgotPasswordClick = () => {
        router.push('/forgetPassword');
    };

    return(
        <p className="text-center text-sm">
            <button onClick={handleForgotPasswordClick} className="text-blue-500 hover:underline focus:outline-none">Forgot Password?</button>
        </p>
    )
}

export default ForgetPassword;
