'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  SelectChangeEvent,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';

const MOCKAPI_QUIZZES_URL = 'https://6858c221138a18086dfbc0ba.mockapi.io/questions'; // Ganti sesuai URL kamu

interface Quiz {
  id: string;
  question: string;
  options: string[]; // 4 pilihan
  answer: string;
  classId: string;
}

const classOptions = [
  { value: '', label: 'Semua Kelas' },
  { value: '1-2', label: 'Kelas 1 - 2' },
  { value: '3-4', label: 'Kelas 3 - 4' },
  { value: '5-6', label: 'Kelas 5 - 6' },
];

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [loading, setLoading] = useState(true);

  const [openEdit, setOpenEdit] = useState(false);
  const [editQuiz, setEditQuiz] = useState<Quiz | null>(null);
  const [editFields, setEditFields] = useState({
    question: '',
    options: ['', '', '', ''],
    answer: '',
  });

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

  useEffect(() => {
    async function fetchQuizzes() {
      setLoading(true);
      try {
        const res = await fetch(MOCKAPI_QUIZZES_URL);
        const data = await res.json();
        setQuizzes(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
    fetchQuizzes();
  }, []);

  useEffect(() => {
    setFilteredQuizzes(
      selectedClass
        ? quizzes.filter((q) => q.classId === selectedClass)
        : quizzes
    );
  }, [selectedClass, quizzes]);

  const handleClassChange = (e: SelectChangeEvent) => {
    setSelectedClass(e.target.value);
  };

  const handleEditOpen = (quiz: Quiz) => {
    setEditQuiz(quiz);
    setEditFields({
      question: quiz.question,
      options: [...quiz.options],
      answer: quiz.answer,
    });
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
    setEditQuiz(null);
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...editFields.options];
    updatedOptions[index] = value;
    setEditFields((prev) => ({ ...prev, options: updatedOptions }));
  };

  const handleEditSubmit = async () => {
    if (!editQuiz) return;
    try {
      const res = await fetch(`${MOCKAPI_QUIZZES_URL}/${editQuiz.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: editFields.question,
          options: editFields.options,
          answer: editFields.answer,
          classId: editQuiz.classId,
        }),
      });
      const updated = await res.json();
      setQuizzes((prev) =>
        prev.map((q) => (q.id === updated.id ? updated : q))
      );
      handleEditClose();
    } catch (err) {
      console.error('Gagal update:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus pertanyaan ini?')) return;
    try {
      await fetch(`${MOCKAPI_QUIZZES_URL}/${id}`, { method: 'DELETE' });
      setQuizzes((prev) => prev.filter((q) => q.id !== id));
    } catch (err) {
      console.error('Gagal hapus:', err);
    }
  };

  return (
    <Box sx={{ p: 4 }}>

         <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mb: { xs: 2, sm: 3 },
            }}
          >
            <Button
              variant="outlined"
              size="small"
              onClick={() => router.push('/profile')}
              sx={{
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                paddingX: { xs: 2, sm: 3 },
                paddingY: { xs: 0.5, sm: 1 },
              }}
            >
              Kembali
            </Button>
          </Box>
      <Typography variant="h4" gutterBottom>
        Halaman Admin - Kelola Kuis
      </Typography>

      <Box sx={{ mb: 3, maxWidth: 200 }}>
        <Select fullWidth value={selectedClass} onChange={handleClassChange} displayEmpty>
          {classOptions.map((c) => (
            <MenuItem key={c.value} value={c.value}>
              {c.label}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : filteredQuizzes.length === 0 ? (
        <Typography>Tidak ada data kuis.</Typography>
      ) : (
        filteredQuizzes.map((quiz) => (
          <Card key={quiz.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>
                {quiz.question}
              </Typography>
              {quiz.options.map((opt, i) => (
                <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                {String.fromCharCode(65 + i)}. {opt}
              </Typography>
              ))}
              <Typography sx={{ mt: 1 }} color="green">
                Jawaban Benar: {quiz.answer}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Kelas: {quiz.classId}
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => handleEditOpen(quiz)}>Edit</Button>
              <Button color="error" onClick={() => handleDelete(quiz.id)}>Hapus</Button>
            </CardActions>
          </Card>
        ))
      )}

      {/* Dialog Edit */}
      <Dialog open={openEdit} onClose={handleEditClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Soal</DialogTitle>
        <DialogContent>
          <TextField
            label="Pertanyaan"
            fullWidth
            margin="dense"
            value={editFields.question}
            onChange={(e) =>
              setEditFields((prev) => ({ ...prev, question: e.target.value }))
            }
          />
          {[0, 1, 2, 3].map((i) => (
            <TextField
              key={i}
              label={`Pilihan ${String.fromCharCode(65 + i)}`}
              fullWidth
              margin="dense"
              value={editFields.options[i]}
              onChange={(e) => handleOptionChange(i, e.target.value)}
            />
          ))}

          <Select
            fullWidth
            margin="dense"
            value={editFields.answer}
            onChange={(e) =>
              setEditFields((prev) => ({ ...prev, answer: e.target.value }))
            }
            sx={{ mt: 2 }}
          >
            {editFields.options.map((opt, i) => (
              <MenuItem key={i} value={opt}>
                {String.fromCharCode(65 + i)}. {opt}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Batal</Button>
          <Button variant="contained" onClick={handleEditSubmit}>
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
