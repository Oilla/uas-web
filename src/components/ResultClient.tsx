'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  Button,
} from '@mui/material';
import { useEffect } from 'react';
import ResultNavbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ResultPage() {
  const router = useRouter();
  const params = useSearchParams();

  const scoreParam = params.get('score');
  const totalParam = params.get('total');

  // Redirect jika tidak ada query
  useEffect(() => {
    if (!scoreParam || !totalParam) {
      router.replace('/kuis'); // langsung redirect tanpa bisa kembali
    }
  }, [scoreParam, totalParam, router]);

  // Parse nilai jika ada
  const score = parseInt(scoreParam || '0', 10);
  const total = parseInt(totalParam || '0', 10);
  const correctAnswers = score;
  const wrongAnswers = total - score;

  return (
    <Box
      sx={{
        backgroundColor: '#4A6B5D',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ResultNavbar />

      <Container
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
          py: 6,
        }}
      >
        <Card
          sx={{
            backgroundColor: '#E8EAF6',
            borderRadius: '25px',
            width: '100%',
            maxWidth: 700,
            position: 'relative',
            px: { xs: 3, sm: 5 },
            py: { xs: 3, sm: 5 },
          }}
        >
          {/* Tombol kembali ke /class */}
          <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => router.push('/class')}
              sx={{
                textTransform: 'none',
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
              }}
            >
              Kembali
            </Button>
          </Box>

          <CardContent>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: '#311B92',
                textAlign: 'center',
                mb: { xs: 2, sm: 3 },
                fontSize: { xs: '1.8rem', sm: '2.4rem' },
              }}
            >
              Yuk lihat skor kamu!
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: 'black',
                textAlign: 'left',
                mb: 1,
                fontSize: { xs: '1rem', sm: '1.2rem' },
              }}
            >
              Jawaban benar: {correctAnswers}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: 'black',
                textAlign: 'left',
                mb: { xs: 2, sm: 3 },
                fontSize: { xs: '1rem', sm: '1.2rem' },
              }}
            >
              Jawaban salah: {wrongAnswers}
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 'bold',
                color: '#311B92',
                textAlign: 'center',
                fontSize: { xs: '2.2rem', sm: '3rem' },
                my: 3,
              }}
            >
              Skor: {score}!
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: 'black',
                textAlign: 'center',
                fontSize: { xs: '1rem', sm: '1.2rem' },
              }}
            >
              Lumayan banget, belajar lebih giat lagi ya
            </Typography>
          </CardContent>
        </Card>
      </Container>

      <Footer />
    </Box>
  );
}
