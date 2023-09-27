import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box, Stack } from '@mui/material';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <>
    <Navbar />
    <Container
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          Register
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            name="firstName"
            label="First Name"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={formData.firstName}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="lastName"
            label="Last Name"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={formData.lastName}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Stack>        
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            component={Link} 
            href="/login"
          >
            Login
          </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
    </>
  );
};

export default RegistrationPage;
