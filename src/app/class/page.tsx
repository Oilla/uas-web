'use client';

import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';
import Link from 'next/link';

const classData = [
  { title: 'Kelas 1 - 2', imageSrc: '/kelas1-2.png', createLink: '/create/1-2' },
  { title: 'Kelas 3 - 4', imageSrc: '/kelas3-4.png', createLink: '/create/3-4' },
  { title: 'Kelas 5 - 6', imageSrc: '/kelas5-6.png', createLink: '/create/5-6' },
];

function ClassPage() {
  return (
    <Box sx={{ backgroundColor: '#4A6B5D', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: 4 }}>
        
        {/* Tombol "Buat Kuis" di pojok kanan, mengarah ke form soal Kelas 1-2 */}
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            component={Link}
            href="/create/1-2" // Langsung ke halaman pembuatan soal
            variant="contained"
            sx={{
              backgroundColor: '#00C853',
              color: 'white',
              borderRadius: '20px',
              padding: '8px 24px',
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: '#009624'
              }
            }}
          >
            Buat Kuis
          </Button>
        </Box>
        
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Grid container spacing={12} justifyContent="center">
            {classData.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
              <Card sx={{ 
                backgroundColor: '#F0F3A5',
                borderRadius: '30px', 
                textAlign: 'center',
                padding: '20px 10px',
                minWidth: 280,
                height: '100%', // biar stretch
                display: 'flex',
                flexDirection: 'column'
              }}>
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'black', marginBottom: 2 }}>
                    {item.title}
                  </Typography>

                  <Box sx={{ marginY: 2 }} className="mx-5 p-0">
                    <Image
                      src={item.imageSrc}
                      alt={`Ikon ${item.title}`}
                      width={180}
                      height={180}
                    />
                  </Box>

                  <Button 
                    component={Link}
                    href={item.createLink}
                    variant="contained" 
                    sx={{ 
                      mt: 'auto', // ✅ biar selalu di bawah
                      backgroundColor: '#4A6B5D',
                      borderRadius: '20px', 
                      padding: '12px 50px',
                      color: 'white',
                      fontSize: '1.3rem',
                      '&:hover': {
                          backgroundColor: '#3B564A'
                      }
                    }}
                  >
                    Kuis
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            ))}
          </Grid>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}

export default ClassPage;