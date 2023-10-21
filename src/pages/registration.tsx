import React, { useState } from "react";
import { Box, IconButton, InputAdornment, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import { Grid } from "@mui/material";
import {
  Google,
  Facebook,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import Image from "next/image";
import AuthHero from "@/components/AuthHero";

const RegistrationPage = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateUser = async () => {
    const userData = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await fetch("/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log("User created successfully!");
        // Redirect or perform other actions here
      } else {
        console.error("Failed to create user.");
        // Handle the error accordingly
      }
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle network or other errors here
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
      <AuthHero />
      {/* Right Side - White with Login Form */}
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: "0 0 60%", // width of the white background
          borderRadius: "50px 0 0 50px",
          backgroundColor: "white",
        }}
      >
        <div style={{ flex: 1 }} /> {/* Spacer to push content to the center */}
        <Stack textAlign="center" sx={{ marginBottom: 5 }}>
          <Typography variant="h5">Create Account</Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
          sx={{ marginBottom: 5 }}
        >
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Google sx={{ color: "#EB4335" }} />}
          >
            <Typography sx={{ color: "#9E9E9E" }}>
              Sign Up with Google
            </Typography>
          </Button>
          <Button
            variant="contained"
            startIcon={<Facebook sx={{ color: "#1877F2" }} />}
          >
            Sign Up with Facebook
          </Button>
        </Stack>
        <Typography
          textAlign="center"
          color="#9E9E9E"
          fontSize="20px"
          marginTop={5}
          marginBottom={5}
        >
          --OR--
        </Typography>
        <Stack>
          <TextField
            sx={{
              marginBottom: 5,
              marginLeft: "auto",
              marginRight: "auto",
              width: "50%",
            }} // Center the text field
            label="Full Name"
            variant="standard"
          />
          <TextField
            sx={{
              marginBottom: 5,
              marginLeft: "auto",
              marginRight: "auto",
              width: "50%",
            }} // Center the text field
            label="Email Address"
            variant="standard"
          />
          <TextField
            sx={{
              marginBottom: 1,
              marginLeft: "auto",
              marginRight: "auto",
              width: "50%",
            }} // Center the text field
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
                    sx={{ color: '"#9E9E9E' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="50%"
          mx="auto"
        >
          <Grid item xs={6}>
            <FormControlLabel control={<Checkbox />} label="Remember me" />
          </Grid>
          <Grid item xs={6}>
            <Link href="#" sx={{ paddingRight: "20px" }}>
              Forgot Password?
            </Link>
          </Grid>
        </Stack>
        <Button
          sx={{
            marginTop: 1,
            marginLeft: "auto",
            marginRight: "auto",
            width: "50%",
            backgroundColor: "#3F51B5",
          }}
          variant="contained"
          color="primary"
          href="/login"
         >
          Sign Up
        </Button>
        <Button href="/login">Already have an account? Log in</Button>
        <div style={{ flex: 1 }} /> {/* Spacer to push content to the center */}
      </Paper>
    </Box>
  );
};

export default RegistrationPage;
