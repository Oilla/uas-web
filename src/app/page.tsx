'use client';

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import { Box, Container } from "@mui/material";

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* Bagian Hero dengan Background */}
      <Box
        sx={{
          position: 'relative',
          backgroundImage: 'url("/background-home.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: { xs: '100vh', md: '100vh' }, // agar selalu full screen
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Overlay Gelap */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1,
          }}
        />

        {/* Konten Hero */}
        <Container
          sx={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            py: { xs: 6, md: 10 },
          }}
        >
          <HeroSection />
        </Container>
      </Box>

      {/* Footer di luar box background agar tidak overlap */}
      <Footer />
    </main>
  );
}
