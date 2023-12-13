import React, { useState, FormEvent } from "react";
import { Alert, Box, IconButton, InputAdornment, Stack } from "@mui/material";
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
import { useRouter } from "next/router";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import urls from "@/constants/urls";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerStatus, setRegisterStatus] = useState<any>(null);
  const router = useRouter();
  const matches = useMediaQuery("(min-width:600px)");

  const handleCreateUser = async (event: FormEvent) => {
    event.preventDefault();
    const userData = {
      name: name,
      email: email,
      password: password,
    };
    setRegisterStatus(null);

    try {
      const response = await axios.post(
        `${urls.apiHost}/createUser`,
        userData
      );

      if (response.status === 201) {
        setRegisterStatus({
          success: true,
        });
        router.push("/login");
      } else {
        const data = response.data;
        setRegisterStatus({
          error: true,
          errorDescription: data.error || "There was an error.",
        });
      }
    } catch (error: any) {
      console.error("Error creating user:", error);
      setRegisterStatus({
        error: true,
        errorDescription: "There was an error. ",
      });
      console.error("Error details:", error.response?.data || error.message);
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
        flexDirection: matches ? "row" : "column",
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
          flex: matches ? "0 0 60%" : "1 0 auto",
          borderRadius: matches ? "50px 0 0 50px" : "0",
          backgroundColor: "white",
        }}
      >
        <div style={{ flex: 1 }} />{" "}
        <Stack
          component="form"
          onSubmit={handleCreateUser}
          gap={2}
          mx="auto"
          width={matches ? "50%" : "80%"}
        >
          {/* Spacer to push content to the center */}
          <Stack textAlign="center" sx={{ marginBottom: 3 }}>
            <Typography variant="h5">Create Account</Typography>
          </Stack>

          {registerStatus && (
            <Alert color={registerStatus?.error ? "error" : "success"}>
              {registerStatus?.success && "Registration successful"}
              {registerStatus?.errorDescription}
            </Alert>
          )}
          <TextField
            autoFocus
            label="Full Name"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
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
          <Button
            sx={{
              marginTop: 3,
              backgroundColor: "#3F51B5",
            }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Sign Up
          </Button>
          <Button sx={{ mt: 2 }} href="/login">
            Already have an account? Log in
          </Button>
        </Stack>
        <div style={{ flex: 1 }} /> {/* Spacer to push content to the center */}
      </Paper>
    </Box>
  );
};

export default RegistrationPage;
