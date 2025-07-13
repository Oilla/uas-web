'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from 'src/components/UserContext';

function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { user } = useUser(); // ambil user dari context

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isLoggedInAsAdmin = user && user.role === 'admin';

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'rgb(0, 121, 255)',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ paddingX: 2, justifyContent: 'space-between' }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/logo.png" alt="EduMath Logo" width={140} height={35} />
        </Box>

        {/* Menu - Responsive */}
        {isMobile ? (
          <>
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
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleMenuClose} component={Link} href="/">Home</MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} href="/kuis">Kuis</MenuItem>
              {isLoggedInAsAdmin ? (
                <MenuItem onClick={handleMenuClose} component={Link} href="/profile">Profile</MenuItem>
              ) : (
                <MenuItem onClick={handleMenuClose} component={Link} href="/login">Login</MenuItem>
              )}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button component={Link} href="/" color="inherit" sx={{ textTransform: 'none', fontSize: '1rem' }}>
              Home
            </Button>
            <Button component={Link} href="/kuis" color="inherit" sx={{ textTransform: 'none', fontSize: '1rem' }}>
              Kuis
            </Button>
            {isLoggedInAsAdmin ? (
              <Button component={Link} href="/profile" color="inherit" sx={{ textTransform: 'none', fontSize: '1rem' }}>
                Profile
              </Button>
            ) : (
              <Button component={Link} href="/login" color="inherit" sx={{ textTransform: 'none', fontSize: '1rem' }}>
                Login
              </Button>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
