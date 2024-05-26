import React, { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import createAxiosInstance from '@/utils/api';

const CreateTanggapan: React.FC = () => {
    const router = useRouter();
    const { ulasanId } = router.query;

    const [form, setForm] = useState({
        id: '',
        penjualId: '',
        ulasan: ulasanId as string,
        tanggapan: ''
    });

    useEffect(() => {
        if (ulasanId) {
            setForm((prevForm) => ({ ...prevForm, ulasan: ulasanId as string }));
        }
    }, [ulasanId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const axiosInstance = createAxiosInstance('http://34.168.24.170/');
        try {
            await axiosInstance.post('penilaian-produk/create', form);
            Swal.fire({
                title: 'Success!',
                text: 'Tanggapan created successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                router.push('/penilaian-produk');
            });
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Error creating tanggapan',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 border rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Create Tanggapan</h1>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Penjual ID</label>
                <input
                    type="text"
                    name="penjualId"
                    value={form.penjualId}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Ulasan ID</label>
                <input
                    type="text"
                    name="ulasan"
                    value={form.ulasan}
                    onChange={handleChange}
                    disabled
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Tanggapan</label>
                <textarea
                    name="tanggapan"
                    value={form.tanggapan}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                ></textarea>
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Create Tanggapan
            </button>
        </form>
    );
};

export default CreateTanggapan;
