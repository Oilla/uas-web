'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Avatar, Button } from '@mui/material';
import Navbar from '../../components/Navbar'; 
import Footer from '../../components/Footer'; 

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const res = await fetch('/api/me');
      if (!res.ok) {
        router.push('/login'); // Kalau belum login
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
    <Box sx={{ backgroundColor: '#CDE8F6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar Component */}
      <Navbar />

      {/* Tombol Logout di atas profil */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          sx={{ borderRadius: '20px', padding: '8px 24px', fontWeight: 'bold' }}
        >
          Logout
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
        <Button
          variant="contained"
          color="success"
          href="/admin"
          sx={{ borderRadius: '20px', padding: '8px 24px', fontWeight: 'bold' }}
        >
          Admin
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }}>
        {/* User Profile Section */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          gap: { xs: 6, sm: 10 },
          backgroundColor: 'transparent',
          borderRadius: '20px',
          padding: 4,
          boxShadow: 'none',
          maxWidth: '800px',
          width: '100%',
        }}>
          <Avatar
            sx={{
              width: 200,
              height: 200,
              backgroundColor: '#4A6B5D',
              flexShrink: 0,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              width="140px"
              height="140px"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </Avatar>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', sm: 'center' },
            flexGrow: 1,
            textAlign: { xs: 'center', sm: 'center' },
          }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'black', marginBottom: 1 }}>
              {user.name}
            </Typography>
            <Typography variant="h5" sx={{ color: 'black', marginBottom: 4 }}>
              Bio:
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Footer Component */}
      <Footer />
    </Box>
  );
}
