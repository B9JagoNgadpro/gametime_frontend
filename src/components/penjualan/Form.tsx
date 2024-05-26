// components/Form.js
"use client"

import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const schema = yup.object().shape({
  nama: yup.string().required('Nama is required'),
  deskripsi: yup.string(),
  harga: yup.number().positive('Harga must be a positive number').required('Harga is required'),
  kategori: yup.string(),
  stok: yup.number().min(0, 'Stok must be zero or a positive number').required('Stok is required'),
  idPenjual: yup.string().required('idPenjual is required')
});

const Form = () => {
  const { control, handleSubmit, formState: { errors }, setValue, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  
  useEffect(() => {
    const email = localStorage.getItem("email") || ''; // Provide a default value of empty string if email is null
    setValue('idPenjual', email);
  }, [setValue]);

  const onSubmit = async (data: any) => {
    try {
      const token = localStorage.getItem('Authorization');
      const response = await fetch('http://34.87.70.230/api/games/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        // Request was successful
        alert('Game berhasil dibuat');
        reset(); // Reset the form after successful submission
        router.push('/login');
      } else {
        if (response.status === 403) {
          alert('Forbidden: You do not have access to this Page, please login as penjual');
        } else {
          alert('Failed to create game');
        }
      }
    } catch (error) {
      console.error('Error sending form data:', error);
      alert('An error occurred while sending the form data');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Controller
          name="nama"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nama"
              variant="outlined"
              error={!!errors.nama}
              helperText={errors.nama ? errors.nama.message : ''}
              fullWidth
              margin="normal"
            />
          )}
        />
      </div>
      <div>
        <Controller
          name="deskripsi"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Deskripsi"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          )}
        />
      </div>
      <div>
        <Controller
          name="harga"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Harga"
              type="number"
              variant="outlined"
              error={!!errors.harga}
              helperText={errors.harga ? errors.harga.message : ''}
              fullWidth
              margin="normal"
            />
          )}
        />
      </div>
      <div>
        <Controller
          name="kategori"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Kategori"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          )}
        />
      </div>
      <div>
        <Controller
          name="stok"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Stok"
              type="number"
              variant="outlined"
              error={!!errors.stok}
              helperText={errors.stok ? errors.stok.message : ''}
              fullWidth
              margin="normal"
            />
          )}
        />
      </div>
      {/* Hidden field for idPenjual */}
      <div>
        <Controller
          name="idPenjual"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="hidden"
            />
          )}
        />
      </div>
      <div>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Form;
