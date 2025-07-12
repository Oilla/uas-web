'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';

function HeroSection() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '85vh',
        gap: 4,
        px: { xs: 3, md: 10 },
        py: { xs: 6, md: 8 },
      }}
    >
      {/* Kiri: Gambar */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Image
          src="/animasi-homepage.png"
          alt="Animasi Belajar Matematika"
          width={500}
          height={500}
          style={{
            width: '100%',
            maxWidth: 400,
            height: 'auto',
          }}
        />
      </Box>

      {/* Kanan: Teks dan Tombol */}
      <Box
        sx={{
          flex: 1,
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Image
          src="/logo.png"
          alt="EduMath Logo"
          width={280}
          height={70}
          style={{
            margin: '0 auto',
            marginBottom: 16,
            display: 'block',
            maxWidth: '100%',
          }}
        />

        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: 500, color: 'white' }}
        >
          Belajar Matematika jadi lebih seru!
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{
            borderRadius: '50px',
            padding: '15px 40px',
            fontSize: '1.1rem',
            textTransform: 'none',
          }}
        >
          Mulai Kuis Sekarang
        </Button>
      </Box>
    </Box>
  );
}

export default HeroSection;
