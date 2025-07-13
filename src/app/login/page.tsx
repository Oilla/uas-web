'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  Alert,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useUser } from 'src/components/UserContext';
import Footer from '@/src/components/Footer';

export default function LoginPage() {
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setStatus('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (res.ok) {
        setUser(data.user);
        setStatus('✅ Login berhasil');
        router.push(data.user?.role === 'admin' ? '/profile' : '/');
      } else {
        setStatus(`❌ ${data.error || 'Login gagal'}`);
        setError(true);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`❌ Terjadi kesalahan: ${message}`);
      setError(true);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#0056D4',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        px: 2,
        py: 4,
      }}
    >
      {/* Judul Welcome */}
      <Typography
        variant="h2"
        component="h1"
        sx={{
          color: '#FFD700',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          mb: { xs: 6, sm: 8, md: 10 },
          fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
        }}
      >
        Welcome
      </Typography>

      {/* Kotak Form Login */}
      <Paper
        elevation={6}
        sx={{
          backgroundColor: '#003366',
          borderRadius: '30px',
          p: { xs: 4, sm: 6, md: 8 },
          maxWidth: 450,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 4 },
        }}
      >
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="outlined"
            InputProps={{
              sx: {
                borderRadius: '20px',
                backgroundColor: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'lightgray',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#FFD700',
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: 'gray',
                '&.Mui-focused': {
                  color: '#FFD700',
                },
              },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
            sx={{ mt: 2 }}
            InputProps={{
              sx: {
                borderRadius: '20px',
                backgroundColor: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'lightgray',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#FFD700',
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: 'gray',
                '&.Mui-focused': {
                  color: '#FFD700',
                },
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: 'white',
              color: 'black',
              borderRadius: '25px',
              py: 1.5,
              px: 4,
              fontSize: '1.3rem',
              fontWeight: 'bold',
              boxShadow: '3px 3px 6px rgba(0,0,0,0.3)',
              '&:hover': {
                backgroundColor: '#f0f0f0',
                boxShadow: '4px 4px 8px rgba(0,0,0,0.4)',
              },
            }}
          >
            Login
          </Button>
        </form>

        {status && (
          <Alert
            severity={error ? 'error' : 'success'}
            sx={{ width: '100%', mt: 2, fontSize: '0.9rem' }}
          >
            {status}
          </Alert>
        )}
      </Paper>
      <Footer />
    </Box>
  );
}
