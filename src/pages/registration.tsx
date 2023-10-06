import React from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import { Grid } from "@mui/material";
import { Google, Facebook } from "@mui/icons-material"; // Import Google and Facebook icons

const RegistrationPage = () => {
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
          flex: "0 0 40%", // width of the yellow background
        }}
      ></div>

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
            color="primary"
            startIcon={<Google sx={{ color: "#EB4335" }} />} // Google icon with blue color
            sx={{
              backgroundColor: "#FAFAFA",
              "&:hover": {
                backgroundColor: "#FAFAFA", // Set the hover background color to the same as normal
              },
            }}
          >
            <Typography sx={{ color: "#9E9E9E" }}>
              Sign Up with Google
            </Typography>
          </Button>
          <Button
            variant="contained"
            startIcon={<Facebook sx={{ color: "#1877F2" }} />}
            sx={{
              backgroundColor: "#FAFAFA",
              color: "#9E9E9E",
              "&:hover": {
                backgroundColor: "#FAFAFA", // Set the hover background color to the same as normal
              },
            }}
          >
            Sign Up with Facebook
          </Button>
        </Stack>
        <Typography textAlign="center" color="#9E9E9E" fontSize="20px">
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
            type="password"
            variant="standard"
          />
        </Stack>
        <Grid
          container
          sx={{ marginTop: 1, justifyContent: "center", paddingLeft: "270px" }}
        >
          <Grid item xs={6}>
            <FormControlLabel control={<Checkbox />} label="Remember me" />
          </Grid>
          <Grid item xs={6}>
            <Link href="#" sx={{ paddingRight: "20px" }}>
              Forgot Password?
            </Link>
          </Grid>
        </Grid>
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
        <Button>Already have an account? Log in</Button>
        <div style={{ flex: 1 }} /> {/* Spacer to push content to the center */}
      </Paper>
    </Box>
  );
};

export default RegistrationPage;
