"use client"
import { useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';

const ChangePasswordPage = () => {
    const router = useRouter();
    const [newPassword, setPassword] = useState('');
    const searchParams = useSearchParams()
    
    const token = searchParams.get('token')

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        const url = new URL('http://34.87.70.230/user/password/savePassword');

        const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
        });
        
        const data = await response.json();

        if (response.ok) {
            alert(data.data);
            router.push('/login')
        } else {
            alert(data.errors);
        }
    
   
   
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
    <div className="w-full max-w-xs">
      <h2 className="text-xl font-bold mb-4 text-center">New Password</h2>
      <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password: </label>
          <input
            id="password"
            value={newPassword}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </form>
    </div>
  </div>
  
  );
};

export default ChangePasswordPage;
