'use client';

import React, { useEffect, useState } from 'react';
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
import { useUser } from 'src/components/UserContext';

const classData = [
  { title: 'Kelas 1 - 2', imageSrc: '/kelas1-2.png', createLink: '/kuis/1-2' },
  { title: 'Kelas 3 - 4', imageSrc: '/kelas3-4.png', createLink: '/kuis/3-4' },
  { title: 'Kelas 5 - 6', imageSrc: '/kelas5-6.png', createLink: '/kuis/5-6' },
];

const MOCKAPI_USERS_URL = 'https://6858c221138a18086dfbc0ba.mockapi.io/users';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  password?: string;
}

function ClassPage() {
  const { user } = useUser();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
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
    <Box
      sx={{
        backgroundColor: '#d4dbfe',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar />
      
      <Box sx={{marginTop: 5, flexGrow: 1, px: { xs: 2, md: 6 }, py: 4 }}>
        {userRole === 'admin' && (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
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
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'black', mb: 3 }}>
          Kuis
        </Typography>
        {/* Tombol Buat Kuis */}

        {/* Kartu Kelas */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 4,
          }}
        >
          {classData.map((item, index) => (
            <Card
              key={index}
              sx={{
                backgroundColor: '#F5F5F5',
                borderRadius: '30px',
                width: { xs: '100%', sm: '80%', md: '300px' },
                display: 'flex',
                flexDirection: 'column',
                padding: 2,
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'row', md: 'column' },
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: { xs: 2, md: 3 },
                  textAlign: 'center',
                }}
              >
                {/* Logo */}
                <Box
                  sx={{
                    width: { xs: 50, md: 80 },
                    height: { xs: 50, md: 80 },
                    position: 'relative',
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={item.imageSrc}
                    alt={`Ikon ${item.title}`}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </Box>

                {/* Teks */}
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: { xs: '0.9rem', md: '1.2rem' },
                    flexGrow: 1,
                  }}
                >
                  {item.title}
                </Typography>

                {/* Tombol */}
                <Button
                  component={Link}
                  href={item.createLink}
                  variant="contained"
                  sx={{
                    backgroundColor: '#0079ff',
                    borderRadius: '20px',
                    padding: { xs: '6px 14px', md: '10px 40px' },
                    fontSize: { xs: '0.8rem', md: '1.1rem' },
                    '&:hover': {
                      backgroundColor: '#0051ab'
                    }
                  }}
                >
                  Kuis
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}

export default ClassPage;
