import React from 'react';
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import { Grid } from "@mui/material";
import Image from 'next/image';

const LoginPage = () => {
  const handleLogin = () => {
    // Implement your login logic here
    console.log("Login button clicked");
  };

  return (
   
    <Box
      sx={{
        display: "flex",
        alignItems: "stretch", // Stretch both sides vertically
        height: "100vh",
        background: "#FFC900", // Set the background color to yellow
      }}
    >
        
      {/* Left Side - Yellow */}
      <div
        style={{
          flex: "0 0 30%", // Take up 30% of the viewport width
        }}
      >
       
      </div>
     
      {/* Right Side - White with Login Form */}
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
         
          flex: "0 0 70%", // Take up 70% of the viewport width
          borderRadius: "50px 0 0 50px",
          backgroundColor: "white", // Set the background color to white
        }}
      >
        
        <div style={{ flex: 1 }} /> {/* Spacer to push content to the center */}
        <div style={{ textAlign:'center', marginBottom:'120px', }}>
        <Typography variant="h5">
          Login
        </Typography>
        <Typography variant='caption'>Please enter your login details to Sign in</Typography>
        </div>
       
        <TextField
          sx={{ marginBottom: 1, marginLeft: 'auto', marginRight: 'auto', width: '50%' }} // Center the text field
          label="Email"
          variant="outlined"
        />
        <TextField
          sx={{ marginBottom: 1, marginLeft: 'auto', marginRight: 'auto', width: '50%' }} // Center the text field
          label="Password"
          type="password"
          variant="outlined"
        />
        <Grid container sx={{ marginTop: 1, justifyContent: 'center', paddingLeft: "270px"  }}>
          <Grid item xs={6}>
            <FormControlLabel
              control={<Checkbox />}
              label="Remember me"
            />
          </Grid>
          <Grid item xs={6}>
            <Link href="#" sx={{ paddingRight: "20px" }}>
              Forgot Password?
            </Link>
          </Grid>
        
        </Grid>
      
        <Button
          sx={{ marginTop: 1, marginLeft: 'auto', marginRight: 'auto', width: '50%' }} // Center the button
          variant="contained"
          color="primary"
          onClick={handleLogin}
        >
          Log In
        </Button>
        <Button href="/registration" disableRipple>Sign Up Here</Button>
        <div style={{ flex: 1 }} /> {/* Spacer to push content to the center */}
        
      </Paper>

     
    </Box>
  );
};

export default LoginPage;
