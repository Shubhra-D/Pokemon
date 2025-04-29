
import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Signup = ({onSignup}) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignup(form);
    setForm({ name: '', email: '', password: '' }); // Reset after signup
    navigate('/pokemon')
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="calc(100vh - 64px)" // Adjust height to below Navbar
    >
      <Paper elevation={6} sx={{ padding: 4, width: 400, backgroundColor: '#FFF' }}>
        <Typography variant="h4" align="center" mb={3} sx={{ color: '#2a75bb' }}>
          Create an Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            value={form.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={handleChange}
            required
          />
          <Button 
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              marginTop: 2,
              backgroundColor: '#FFCB05',
              color: '#000',
              '&:hover': { backgroundColor: '#f5b700' }
            }}
          >
            Sign Up
          </Button>
        </form>
        
<Box textAlign="center" mt={2}>
  <Button onClick={()=>navigate('/')}>
    Back to Home
  </Button>
</Box>
      </Paper>
    </Box>
  );
};

export default Signup;
