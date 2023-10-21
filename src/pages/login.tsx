import AuthHero from "@/components/AuthHero";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Grid, IconButton, InputAdornment, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const LoginPage = () => {
  const handleLogin = () => {
    // Implement your login logic here
    console.log("Login button clicked");
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "",
        password: "",
      }),
    });
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
      <AuthHero />

      {/* Right Side - White with Login Form */}
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: "0 0 60%", // Take up 70% of the viewport width
          borderRadius: "50px 0 0 50px",
          backgroundColor: "white", // Set the background color to white
        }}
      >
        <div style={{ flex: 1 }} />
        <Stack gap={2} mx="auto" width="50%">
          <div style={{ textAlign: "center" }}>
            <Typography variant="h5">Login</Typography>
            <Typography variant="caption">
              Please enter your login details to Sign in
            </Typography>
          </div>
          <TextField label="Email" variant="outlined" />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
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
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
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
            }}
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Log In
          </Button>
          <Button href="/registration" variant="text" disableRipple>
            Sign Up Here
          </Button>
        </Stack>
        <div style={{ flex: 1 }} /> {/* Spacer to push content to the center */}
      </Paper>
    </Box>
  );
};

export default LoginPage;
