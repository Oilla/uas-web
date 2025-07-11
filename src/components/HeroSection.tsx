'use client';

import React from 'react';
import { Grid, Typography, Button, Box, useMediaQuery, useTheme } from '@mui/material'; // Import useMediaQuery and useTheme
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function HeroSection() {
  const router = useRouter();
  const theme = useTheme(); // Access the default theme
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Check if screen is 'md' or smaller

  const handleStartQuizClick = () => {
    router.push('/class');
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center" // Center content horizontally
      sx={{
        minHeight: '85vh', // Use minHeight for flexibility
        padding: { xs: 2, md: 4 }, // Add padding for smaller screens
        flexDirection: { xs: 'column-reverse', md: 'row' }, // Reverse order on mobile
        textAlign: { xs: 'center', md: 'left' }, // Center text on mobile
        gap: { xs: 4, md: 0 }, // Add gap between items on mobile
      }}
    >
      {/* Kolom Kanan: Teks dan Tombol (will appear above image on mobile due to column-reverse) */}
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            paddingLeft: { md: 4 }, // Padding for larger screens
            paddingTop: { xs: 4, md: 0 }, // Add top padding on mobile
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' }, // Center items on mobile, align left on desktop
          }}
        >
          {/* Teks "EduMath" diganti dengan logo */}
          <Image
            src="/logo.png"
            alt="EduMath Logo"
            width={280}
            height={70}
            style={{ marginBottom: isMobile ? '16px' : '0' }} // Add margin below logo on mobile
          />

          <Typography variant="h5" sx={{ marginY: { xs: 2, md: 2 }, marginLeft: { xs: 0, md: '5px' } }}>
            Belajar Matematika jadi lebih seru!
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleStartQuizClick}
            sx={{
              borderRadius: '50px',
              padding: '15px 40px',
              marginTop: { xs: 2, md: 2 },
              fontSize: '1.1rem',
              textTransform: 'none',
              marginLeft: { xs: 0, md: '5px' }
            }}
          >
            Mulai Kuis Sekarang
          </Button>
        </Box>
      </Grid>

      {/* Kolom Kiri: Gambar Animasi (will appear below text on mobile due to column-reverse) */}
      <Grid item xs={12} md={6}>
        <Image
          src="/animasi-homepage.png"
          alt="Animasi Belajar Matematika"
          width={500}
          height={500}
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '500px', // Prevent image from getting too large on very big screens
            display: 'block', // Ensures margin auto works
            margin: '0 auto', // Center image on mobile
          }}
        />
      </Grid>
    </Grid>
  );
}

export default HeroSection;