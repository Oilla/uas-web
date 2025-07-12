// 'use client';

// import React, { useState } from 'react';
// import {
//     Box,
//     Typography,
//     Button,
//     Card,
//     CardContent,
//     Radio,
//     RadioGroup,
//     FormControlLabel,
//     FormControl,
//     Grid
// } from '@mui/material';
// import Navbar from '../../components/Navbar';
// import Footer from '../../components/Footer';

// const QuizPage: React.FC = () => {
//     const [selectedValue, setSelectedValue] = useState<string>('');
//     const [showFeedback, setShowFeedback] = useState<boolean>(false);

//     const correctAnswer = '7';
//     const question = "Doni memiliki 10 apel, lalu Jio memakan 3 apel Doni. Berapakah sisa apel yang dimiliki Doni sekarang?";
//     const options = ['9', '5', '7', '13'];

//     const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setSelectedValue(event.target.value);
//         setShowFeedback(true);
//     };

//     const isWrongAnswer = showFeedback && selectedValue !== correctAnswer;

//     return (
//         <Box sx={{ backgroundColor: '#FEFFD5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
//             <Navbar />

//             <Box
//                 sx={{
//                     flexGrow: 1,
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     padding: 4
//                 }}
//             >
//                 <Card sx={{
//                     backgroundColor: '#1D5A4B',
//                     color: 'white',
//                     borderRadius: '20px',
//                     padding: '40px 30px',
//                     width: '100%',
//                     maxWidth: '800px',
//                 }}>
//                     <CardContent>
//                         {/* BORDER UNTUK SOAL */}
//                         <Box sx={{
//                             border: '2px solid white',
//                             borderRadius: '16px',
//                             padding: '16px 24px',
//                             mb: 3 // Memberi jarak bawah ke kotak jawaban
//                         }}>
//                             <Typography variant="h5" component="p" sx={{ fontWeight: 'medium' }}>
//                                 {question}
//                             </Typography>
//                         </Box>

//                         {/* BORDER UNTUK JAWABAN */}
//                         <Box sx={{
//                             border: '2px solid white',
//                             borderRadius: '16px',
//                             padding: '24px'
//                         }}>
//                             <Grid container spacing={4} alignItems="center">
//                                 {/* Kolom Pilihan Jawaban */}
//                                 <Grid item xs={12} md={6}>
//                                     <FormControl component="fieldset">
//                                         <RadioGroup
//                                             name="quiz-options"
//                                             value={selectedValue}
//                                             onChange={handleRadioChange}
//                                         >
//                                             {options.map((option) => (
//                                                 <FormControlLabel
//                                                     key={option}
//                                                     value={option}
//                                                     control={
//                                                         <Radio sx={{
//                                                             color: 'white',
//                                                             '&.Mui-checked': {
//                                                                 color: '#87CEEB',
//                                                             },
//                                                         }} />
//                                                     }
//                                                     label={
//                                                         <Typography sx={{ fontSize: '1.2rem' }}>
//                                                             {option}
//                                                         </Typography>
//                                                     }
//                                                     sx={{ mb: 1 }}
//                                                 />
//                                             ))}
//                                         </RadioGroup>
//                                     </FormControl>
//                                 </Grid>

//                                 {/* Kolom Feedback Jawaban */}
//                                 {isWrongAnswer && (
//                                     <Grid item xs={12} md={6}>
//                                         <Card sx={{
//                                             backgroundColor: 'white',
//                                             color: 'black',
//                                             borderRadius: '15px',
//                                             padding: '16px'
//                                         }}>
//                                             <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
//                                                 Jawaban kamu salah
//                                             </Typography>
//                                             <Typography variant="body1" sx={{ my: 1, fontWeight: 'bold' }}>
//                                                 10 - 3 = 7
//                                             </Typography>
//                                             <Typography variant="body2">
//                                                 Jangan pantang menyerah, yuk coba soal berikutnya.
//                                             </Typography>
//                                         </Card>
//                                     </Grid>
//                                 )}
//                             </Grid>
//                         </Box>

//                         {/* Tombol Lanjut */}
//                         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
//                             <Button sx={{ color: 'white', textTransform: 'none', fontSize: '1.1rem' }}>
//                                 Lanjut &raquo;
//                             </Button>
//                         </Box>
//                     </CardContent>
//                 </Card>
//             </Box>

//             <Footer />
//         </Box>
//     );
// }

// export default QuizPage;
