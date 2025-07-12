'use client';

import React, { useState } from 'react';
import { Box, Button, Card, TextField, RadioGroup, FormControlLabel, Radio, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function CreateQuestionPage() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('a');
  const [classId, setClassId] = useState('');

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async () => {
    if (!question || options.some(opt => !opt) || !classId) {
      alert('Semua field harus diisi!');
      return;
    }

    const answerIndex = ['a', 'b', 'c', 'd'].indexOf(correctAnswer);
    const payload = {
      question,
      options,
      answer: options[answerIndex],
      classId,
    };

    try {
      const res = await fetch('https://6858c221138a18086dfbc0ba.mockapi.io/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert('Berhasil disimpan!');
        // Reset form
        setQuestion('');
        setOptions(['', '', '', '']);
        setCorrectAnswer('a');
        setClassId('');
      } else {
        alert('Gagal menyimpan.');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat menyimpan.');
    }
  };

  return (
    <Box sx={{ backgroundColor: '#D6C4E5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
        <Card sx={{
          backgroundColor: '#F3E5F5',
          borderRadius: '30px',
          padding: '40px',
          width: '100%',
          maxWidth: '700px',
        }}>
          {/* Dropdown pilih kelas */}
          <FormControl fullWidth sx={{ marginBottom: 3 }}>
            <InputLabel id="class-select-label">Pilih Kelas</InputLabel>
            <Select
              labelId="class-select-label"
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              label="Pilih Kelas"
            >
              <MenuItem value="1-2">Kelas 1 - 2</MenuItem>
              <MenuItem value="3-4">Kelas 3 - 4</MenuItem>
              <MenuItem value="5-6">Kelas 5 - 6</MenuItem>
            </Select>
          </FormControl>

          {/* Input pertanyaan */}
          <TextField
            fullWidth
            variant="standard"
            placeholder="Ketik pertanyaan di sini..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            InputProps={{
              disableUnderline: true,
              style: { fontSize: '1.5rem', color: '#6A1B9A' }
            }}
          />

          {/* Garis pemisah */}
          <Box sx={{ borderBottom: '2px dashed #9C27B0', marginY: '20px' }} />

          {/* Pilihan jawaban */}
          <RadioGroup value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)}>
            {['a', 'b', 'c', 'd'].map((opt, index) => (
              <FormControlLabel
                key={opt}
                value={opt}
                control={<Radio />}
                label={
                  <TextField
                    variant="standard"
                    placeholder={`Jawaban ${opt.toUpperCase()}`}
                    value={options[index]}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    InputProps={{ disableUnderline: true }}
                  />
                }
              />
            ))}
          </RadioGroup>
        </Card>

        <Button
          variant="text"
          endIcon={<ArrowForwardIcon />}
          onClick={handleSubmit}
          sx={{
            marginTop: 2,
            alignSelf: 'flex-end',
            marginRight: '25%',
            color: 'black',
            textTransform: 'none',
            fontSize: '1.2rem'
          }}
        >
          Simpan
        </Button>
      </Box>
      <Footer />
    </Box>
  );
}
