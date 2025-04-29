import { AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import Pikachu from '../assets/Pikachu.jpeg';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <AppBar position='static' sx={{ backgroundColor: '#FFCB05', padding: '0 16px', borderRadius: '10px' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left side: Logo */}
        <Box display="flex" alignItems="center">
          <img 
            src={Pikachu} 
            alt="Pokemon Logo" 
            style={{ height: 50, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />
        </Box>

        {/* Right side: User Info / Signup */}
        <Box display="flex" alignItems="center" gap={2}>
          {user ? (
            <>
              <Avatar sx={{ bgcolor: '#3B4CCA' }}>
                {user.name[0].toUpperCase()}
              </Avatar>
              <Typography variant="h6" sx={{ color: '#2a75bb' }}>
                {user.name}
              </Typography>
              <Button 
                variant="contained" 
                onClick={onLogout}
                sx={{
                  backgroundColor: '#E3350D',
                  '&:hover': { backgroundColor: '#CC0000' }
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <IconButton color="inherit">
                <AccountCircle fontSize="large" sx={{ color: '#2a75bb' }} />
              </IconButton>
              <Button
                variant="contained"
                onClick={() => navigate('/signup')}
                sx={{
                  backgroundColor: '#3B4CCA',
                  color: '#ffffff',
                  '&:hover': { backgroundColor: '#2a3ca8' }
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
