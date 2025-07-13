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
        minHeight: '60vh',
        gap: 6,
        px: { xs: 3, md: 10 },
        py: { xs: 6, md: 8 },
      }}
    >
      {/* Kiri: Gambar animasi */}
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

      {/* Kanan: Konten teks */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'flex-start' },
          textAlign: { xs: 'center', md: 'left' },
          gap: 2,
        }}
      >
        {/* Logo EduMath */}
        <Image
          src="/logo.png"
          alt="EduMath Logo"
          width={280}
          height={70}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />

        {/* Subjudul */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 500,
            color: 'white',
            fontSize: { xs: '1.2rem', md: '1.5rem' },
          }}
        >
          Belajar Matematika jadi lebih seru!
        </Typography>

        {/* Tombol */}
        <Button
          variant="contained"
          size="large"
          sx={{
            borderRadius: '50px',
            padding: '14px 36px',
            fontSize: '1rem',
            textTransform: 'none',
            mt: { xs: 2, md: 3 },
          }}
          href="/kuis"
        >
          Mulai Kuis Sekarang
        </Button>
      </Box>
    </Box>
  );
}

export default HeroSection;
