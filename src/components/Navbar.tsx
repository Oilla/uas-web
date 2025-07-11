'use client';

import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Avatar, Box, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import Link from 'next/link';

function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Explicitly type anchorEl

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => { // Type the event here
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'rgba(0, 121, 255, 0.43)',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ paddingX: '24px !important' }}>
        {/* Logo */}
        <Image src="/logo.png" alt="EduMath Logo" width={140} height={35} />

        {/* Spacer to push items to the right */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Navigation Menu for Larger Screens (md and up) */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <Button component={Link} href="/" color="inherit" sx={{ textTransform: 'none', fontSize: '1rem' }}>Home</Button>
          <Button component={Link} href="/class" color="inherit" sx={{ textTransform: 'none', fontSize: '1rem' }}>Class</Button>
          <Button component={Link} href="/create" color="inherit" sx={{ textTransform: 'none', fontSize: '1rem' }}>Create</Button>
          <Button component={Link} href="/profile" color="inherit" sx={{ textTransform: 'none', fontSize: '1rem' }}>Profile</Button>
        </Box>

        {/* Burger Menu for Smaller Screens (xs) */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose} component={Link} href="/">Home</MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} href="/class">Class</MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} href="/create">Create</MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} href="/profile">Profile</MenuItem>
          </Menu>
        </Box>


      </Toolbar>
    </AppBar>
  );
}

export default Navbar;