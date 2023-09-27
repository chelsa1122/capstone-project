import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const LoginPage = () => {
  const handleLogin = () => {
    // Implement your login logic here
    console.log('Login button clicked');
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
      <Paper elevation={3}
        sx={{
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '300px',
        }}
      >
        <Typography variant="h5" gutterBottom >
          Login
        </Typography>
        <TextField
          sx={{ marginBottom: 2 }}
          label="Username"
          variant="outlined"
          fullWidth
        />
        <TextField
          sx={{ marginBottom: 2 }}
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
        />
        <Button
          sx={{ marginTop: 2 }}
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Log In
        </Button>
      </Paper>
    </Container>
    </>
  );
};

export default LoginPage;
