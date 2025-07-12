'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const classData = [
  { title: 'Kelas 1 - 2', imageSrc: '/kelas1-2.png', createLink: '/kuis/1-2' },
  { title: 'Kelas 3 - 4', imageSrc: '/kelas3-4.png', createLink: '/kuis/3-4' },
  { title: 'Kelas 5 - 6', imageSrc: '/kelas5-6.png', createLink: '/kuis/5-6' },
];

const MOCKAPI_USERS_URL = 'https://6858c221138a18086dfbc0ba.mockapi.io/users'; // Ganti dengan URL MockAPI kamu

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  password?: string;
}

import { useUser } from 'src/components/UserContext';

function ClassPage() {
  const { user } = useUser();
  const [userRole, setUserRole] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchUser() {
      if (!user?.email) return;

      try {
        const res = await fetch(`${MOCKAPI_USERS_URL}?email=${encodeURIComponent(user.email)}`);
        if (!res.ok) throw new Error('Gagal mengambil data user');
        const users = await res.json();
        if (users.length > 0) setUserRole(users[0].role);
        else setUserRole(null);
      } catch {
        setUserRole(null);
      }
    }
    fetchUser();
  }, [user?.email]);

  return (
    <Box sx={{ backgroundColor: '#d4dbfe', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: 4 }}>
        
        {/* Tombol "Buat Kuis" */}
        {userRole === 'admin' && (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            component={Link}
            href="/create"
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
        )}

        {/* Kartu Kelas */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 4,
            mt: 2,
          }}
        >
          {classData.map((item, index) => (
            <Box
              key={index}
              sx={{
                width: { xs: '100%', sm: '45%', md: '30%' },
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Card
                sx={{
                  backgroundColor: '#F5F5F5',
                  borderRadius: '30px',
                  textAlign: 'center',
                  padding: '20px 10px',
                  width: '100%',
                  maxWidth: 350,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
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

                  <Box sx={{ marginY: 2 }}>
                    <Image
                      src={item.imageSrc}
                      alt={`Ikon ${item.title}`}
                      width={180}
                      height={180}
                      style={{ margin: '0 auto' }}
                    />
                  </Box>

                  <Button
                    component={Link}
                    href={item.createLink}
                    variant="contained"
                    sx={{
                      mt: 'auto',
                      backgroundColor: '#0079ff',
                      borderRadius: '20px',
                      padding: '12px 50px',
                      color: 'white',
                      fontSize: '1.3rem',
                      '&:hover': {
                        backgroundColor: '#0051ab'
                      }
                    }}
                  >
                    Kuis
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}

export default ClassPage;
