// src/app/create/[classId]/page.tsx
'use client';

import React from 'react';
import { Box, Typography, Button, Card, TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Menggunakan ikon dari MUI

function CreateQuizPage({ params }: { params: { classId: string } }) {
  // Mengambil ID kelas dari URL, misal: "1-2"
  const classId = decodeURIComponent(params.classId);

  return (
    <Box sx={{ backgroundColor: '#D6C4E5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
        <Card sx={{
          backgroundColor: '#F3E5F5', // Warna ungu muda
          borderRadius: '30px',
          padding: '40px',
          width: '100%',
          maxWidth: '700px',
        }}>
          {/* Input Pertanyaan */}
          <TextField
            fullWidth
            variant="standard"
            placeholder="ketik pertanyaan anda disini..."
            InputProps={{
              disableUnderline: true,
              style: { fontSize: '1.5rem', color: '#6A1B9A' }
            }}
          />
          
          {/* Garis Pemisah */}
          <Box sx={{ borderBottom: '2px dashed #9C27B0', marginY: '20px' }} />

          {/* Input Jawaban dengan Radio Button */}
          <RadioGroup defaultValue="a">
            <FormControlLabel value="a" control={<Radio />} label={<TextField variant="standard" placeholder="ketik jawaban disini..." InputProps={{disableUnderline: true}} />} />
            <FormControlLabel value="b" control={<Radio />} label={<TextField variant="standard" placeholder="ketik jawaban disini..." InputProps={{disableUnderline: true}} />} />
            <FormControlLabel value="c" control={<Radio />} label={<TextField variant="standard" placeholder="ketik jawaban disini..." InputProps={{disableUnderline: true}} />} />
            <FormControlLabel value="d" control={<Radio />} label={<TextField variant="standard" placeholder="ketik jawaban disini..." InputProps={{disableUnderline: true}} />} />
          </RadioGroup>
        </Card>

        {/* Tombol Simpan */}
        <Button 
          variant="text" 
          endIcon={<ArrowForwardIcon />}
          sx={{ 
            marginTop: 2, 
            alignSelf: 'flex-end', 
            marginRight: '25%', // Menyesuaikan posisi
            color: 'black', 
            textTransform: 'none',
            fontSize: '1.2rem'
          }}
        >
          Simpan
        </Button>
      </Box>

      <Footer />
    </Box>
  );
}

export default CreateQuizPage;