'use client';

import React, { useState } from 'react';
import { Box, Typography, Button, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import Navbar from '../../components/Navbar'; // Assuming you have a Navbar component
import Footer from '../../components/Footer'; // Assuming you have a Footer component

function ProfilePage() {
  // State untuk menyimpan nama pengguna dan bio
  const [userName, setUserName] = useState("User");
  const [userBio, setUserBio] = useState("Write your bio");

  // State untuk mengontrol visibilitas dialog edit
  const [openEditDialog, setOpenEditDialog] = useState(false);
  // State sementara untuk input di dialog
  const [tempUserName, setTempUserName] = useState("");
  const [tempUserBio, setTempUserBio] = useState("");

  // Fungsi untuk membuka dialog edit
  const handleEditClick = () => {
    setTempUserName(userName); // Isi dengan nilai saat ini
    setTempUserBio(userBio);   // Isi dengan nilai saat ini
    setOpenEditDialog(true);
  };

  // Fungsi untuk menutup dialog edit
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  // Fungsi untuk menyimpan perubahan nama dan bio
  const handleSaveProfile = () => {
    setUserName(tempUserName);
    setUserBio(tempUserBio);
    setOpenEditDialog(false);
  };

  return (
    <Box sx={{ backgroundColor: '#CDE8F6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar Component */}
      <Navbar />

      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }}>
        {/* User Profile Section */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically on small screens, row on larger
          alignItems: 'center',
          gap: { xs: 6, sm: 10 }, // Spacing between avatar and text/button, increased for more centered look
          backgroundColor: 'transparent', // Background matches page background
          borderRadius: '20px',
          padding: 4,
          boxShadow: 'none',
          maxWidth: '800px', // Limit width for better readability
          width: '100%',
        }}>
          {/* Avatar Section */}
          <Avatar
            sx={{
              width: 200, // Larger avatar as per design
              height: 200,
              backgroundColor: '#4A6B5D', // Dark green color from design
              flexShrink: 0, // Prevent avatar from shrinking
            }}
          >
            {/* User icon SVG inside Avatar */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              width="140px" // Larger icon inside avatar
              height="140px"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </Avatar>

          {/* User Info and Edit Button Section */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', sm: 'center' }, // Centered text and button on all screen sizes
            flexGrow: 1, // Allow this section to take available space
            textAlign: { xs: 'center', sm: 'center' }, // Center text for all screen sizes
          }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'black', marginBottom: 1 }}>
              {userName}
            </Typography>
            <Typography variant="h5" sx={{ color: 'black', marginBottom: 4 }}>
              Bio: {userBio}
            </Typography>
            <Button
              variant="contained"
              onClick={handleEditClick} // Tambahkan event handler untuk tombol Edit
              sx={{
                backgroundColor: '#64B5F6', // Blue color from design
                borderRadius: '20px',
                padding: '12px 60px',
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#42A5F5', // Slightly darker blue on hover
                },
                minWidth: '150px', // Ensure button has a minimum width
              }}
            >
              Edit
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Footer Component */}
      <Footer />

      {/* Dialog untuk mengedit profil */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Profil</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nama Pengguna"
            type="text"
            fullWidth
            variant="standard"
            value={tempUserName}
            onChange={(e) => setTempUserName(e.target.value)}
            sx={{ mb: 2 }} // Margin bottom for spacing
          />
          <TextField
            margin="dense"
            id="bio"
            label="Bio"
            type="text"
            fullWidth
            multiline // Allow multiple lines for bio
            rows={3}   // Set initial rows for bio
            variant="standard"
            value={tempUserBio}
            onChange={(e) => setTempUserBio(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} sx={{ color: '#4A6B5D' }}>Batal</Button>
          <Button onClick={handleSaveProfile} variant="contained" sx={{ backgroundColor: '#64B5F6', '&:hover': { backgroundColor: '#42A5F5' } }}>Simpan</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ProfilePage;