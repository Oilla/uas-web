import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Container>
        <HeroSection />
      </Container>
      <Footer />
    </main>
  );
}