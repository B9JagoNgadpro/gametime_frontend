import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import createAxiosInstance from '@/utils/api';
import { Ulasan } from '../ulasan/ListUlasan';

interface TanggapanUlasan {
    id: string;
    penjualId: string;
    ulasan: Ulasan;
    tanggapan: string;
    date: string;
}

const ListTanggapan: React.FC<{ penjualId: string }> = ({ penjualId }) => {
    const [tanggapanList, setTanggapanList] = useState<TanggapanUlasan[]>([]);
    const axiosInstance = createAxiosInstance('http://34.168.24.170/');

    useEffect(() => {
        const fetchTanggapan = async () => {
            try {
                const response = await axiosInstance.get<TanggapanUlasan[]>(`penilaian-produk/user/${penjualId}`);
                console.log('Response data:', response.data); // Log the response data
                setTanggapanList(response.data);
            } catch (error) {
                console.error('Error fetching tanggapan:', error);
            }
        };

        fetchTanggapan();
    }, [penjualId]);

    const handleDelete = async (idTanggapan: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosInstance.delete(`/penilaian-produk/delete/${idTanggapan}`);
                    setTanggapanList((prevTanggapanList) => prevTanggapanList.filter(tanggapan => tanggapan.id !== idTanggapan));
                    Swal.fire(
                        'Deleted!',
                        'Tanggapan has been deleted.',
                        'success'
                    );
                } catch (error) {
                    Swal.fire(
                        'Error!',
                        'There was an error deleting the tanggapan.',
                        'error'
                    );
                }
            }
        });
    };

    return (
        <div className="row d-flex justify-content-center p-4">
            {tanggapanList.length === 0 ? (
                <p>No responses found.</p>
            ) : (
                tanggapanList.map((response) => (
                    <div key={response.id} className="col-md-12 col-lg-10 col-xl-8 mb-4">
                        <div className="bg-white p-4 rounded-lg shadow-md border border-warning border-3 relative">
                            <div className="border-b border-gray-200 pb-2 mb-2">
                                <div className="flex flex-col md:flex-row">
                                    <div className="flex flex-col p-2">
                                        <h5 className="mb-1 text-lg font-medium text-black text-left">
                                            {response.ulasan.game}
                                        </h5>
                                        <p className="mb-1 text-sm text-black text-left">
                                            User: {response.ulasan.idUser}
                                        </p>
                                        <p className="mb-1 text-sm text-black text-left">
                                            Date: {response.ulasan.date}
                                        </p>
                                        <p className="mb-1 text-sm text-black text-left">
                                            Rating: {response.ulasan.rating}
                                        </p>
                                        <p className="mb-1 text-sm text-black text-left">
                                            Description: {response.ulasan.deskripsi}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-2">
                                <div className="d-flex flex-start align-items-center">
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <h6 className="fw-bold text-warning mb-1">
                                                {response.penjualId}
                                            </h6>
                                        </div>
                                    </div>
                                    <p className="text-muted small mb-1 px-2">
                                        {response.date}
                                    </p>
                                </div>
                                <p>{response.tanggapan}</p>
                                <button 
                                    onClick={() => handleDelete(response.id)} 
                                    className="absolute bottom-4 right-4 text-red-500 hover:text-red-700">
                                    <FaTrashAlt />
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ListTanggapan;
