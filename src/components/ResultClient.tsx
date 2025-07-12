'use client';

import { useSearchParams } from 'next/navigation';
import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function ResultClient() {
    const params = useSearchParams();
    const score = params.get('score');
    const total = params.get('total');

    return (
        <Box sx={{ textAlign: 'center', padding: 10 }}>
        <Typography variant="h4" gutterBottom>
            Kuis Selesai!
        </Typography>
        <Typography variant="h5" gutterBottom>
            Skor Anda: {score} / {total}
        </Typography>
        <Link href="/">
            <Button variant="contained" sx={{ mt: 4 }}>
            Kembali ke Beranda
            </Button>
        </Link>
        </Box>
    );
}
