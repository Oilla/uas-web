'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Avatar,
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const iconSize = isMobile ? 40 : 50;

  useEffect(() => {
    const checkUser = async () => {
      const res = await fetch('/api/me');
      if (!res.ok) {
        router.push('/login');
        return;
      }
      const data = await res.json();
      setUser(data);
      setLoading(false);
    };
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/login');
      } else {
        alert('Gagal logout');
      }
    } catch (error) {
      alert('Terjadi kesalahan saat logout');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Box
      sx={{
        backgroundColor: '#D0D6F7',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Navbar />

      {/* Bagian Profile */}
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: { xs: 4, sm: 6, md: 8 },
          marginTop: 8,
          width: { xs: '92%', sm: 460, md: 520 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
        }}
      >
        <Avatar
          sx={{
            width: { xs: 80, sm: 100 },
            height: { xs: 80, sm: 100 },
            backgroundColor: '#346B54',
            mb: 3,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="black"
            width={iconSize}
            height={iconSize}
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </Avatar>

        <Typography
          variant="h5"
          sx={{ fontWeight: 'bold', color: 'black', mb: 4, textAlign: 'center' }}
        >
          {user.name}
        </Typography>

        {/* Tombol Admin dan Login */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' }, // ← ini kuncinya
            gap: 3,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            variant="contained"
            href="/admin"
            sx={{
              backgroundColor: '#004C8C',
              borderRadius: '10px',
              width: { xs: '100%', sm: 140 },
              fontSize: { xs: '0.9rem', sm: '1rem' },
              paddingY: 1.5,
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#003b6b' },
            }}
          >
            Admin
          </Button>

          <Button
            variant="contained"
            onClick={handleLogout}
            sx={{
              backgroundColor: '#FF0000',
              borderRadius: '10px',
              width: { xs: '100%', sm: 140 },
              fontSize: { xs: '0.9rem', sm: '1rem' },
              paddingY: 1.5,
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#cc0000' },
            }}
          >
            Logout
          </Button>

        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
