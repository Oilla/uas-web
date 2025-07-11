// src/components/Footer.jsx
'use client';

import React from 'react';
import { Box, Typography, Container } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        paddingY: 4,
      }}
    >
      <Container>
        <Typography variant="body2" align="center" color="rgba(255, 255, 255, 0.7)">
          2025 EduMath. Designed & developed by @wvc
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;