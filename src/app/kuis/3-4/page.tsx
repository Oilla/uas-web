'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { useRouter } from 'next/navigation';

type Question = {
  id: string;
  classId: string;
  question: string;
  options: string[];
  answer: string;
};

const QuizPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedValue, setSelectedValue] = useState('');
  const [score, setScore] = useState(0);
  const router = useRouter();

  const MOCKAPI_URL = 'https://6858c221138a18086dfbc0ba.mockapi.io/questions?classId=3-4';

  useEffect(() => {
    fetch(MOCKAPI_URL)
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error('Gagal fetch data:', error));
  }, []);

  if (questions.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', padding: 10 }}>
        <Typography variant="h6">Loading soal...</Typography>
      </Box>
    );
  }

  const currentQuestion = questions[currentIndex];

  const handleOptionClick = (value: string) => {
    setSelectedValue(value);

    const selected = value.trim().toLowerCase();
    const correct = currentQuestion.answer.trim().toLowerCase();

    if (selected === correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedValue('');
    } else {
      router.push(`/result?score=${score}&total=${questions.length}`);
    }
  };

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <Box sx={{ backgroundColor: '#FEFFD5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
        <Card
          sx={{
            backgroundColor: '#1D5A4B',
            color: 'white',
            borderRadius: '20px',
            padding: { xs: '24px 16px', md: '40px 30px' },
            width: '100%',
            maxWidth: '800px',
          }}
        >
          <CardContent>
            {/* Soal */}
            <Box
              sx={{
                border: '2px solid white',
                borderRadius: '16px',
                padding: { xs: '12px 16px', md: '16px 24px' },
                mb: 3,
              }}
            >
              <Typography
                variant="h5"
                component="p"
                sx={{
                  fontWeight: 'medium',
                  fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
                }}
              >
                {currentQuestion.question}
              </Typography>
            </Box>

            {/* Opsi Jawaban */}
            <Box>
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedValue === option;
                return (
                  <Box
                    key={option}
                    onClick={() => handleOptionClick(option)}
                    sx={{
                      cursor: 'pointer',
                      padding: { xs: '10px 14px', md: '12px 16px' },
                      borderRadius: '12px',
                      backgroundColor: isSelected ? '#87CEEB' : '#ffffff22',
                      border: isSelected ? '2px solid #ffffff' : '2px solid transparent',
                      color: 'white',
                      fontSize: { xs: '0.95rem', md: '1.1rem' },
                      transition: 'all 0.25s ease-in-out',
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      '&:hover': {
                        backgroundColor: isSelected ? '#6AB7D6' : '#ffffff33',
                        transform: 'scale(1.02)',
                      },
                    }}
                  >
                    <Box sx={{ fontWeight: 'bold', mr: 2 }}>{optionLabels[index]}.</Box>
                    <Box>{option}</Box>
                  </Box>
                );
              })}
            </Box>

            {/* Tombol Lanjut */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              <Button
                onClick={handleNext}
                disabled={!selectedValue}
                sx={{
                  color: 'white',
                  textTransform: 'none',
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  paddingX: 2,
                  opacity: selectedValue ? 1 : 0.5,
                }}
              >
                {currentIndex + 1 === questions.length ? 'Selesai' : 'Lanjut »'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Footer />
    </Box>
  );
};

export default QuizPage;
