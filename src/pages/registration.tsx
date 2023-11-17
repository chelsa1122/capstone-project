import React, { useState } from "react";
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
import useMediaQuery from '@mui/material/useMediaQuery';


const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerStatus, setRegisterStatus] = useState<any>(null);
  const router = useRouter();
  const matches = useMediaQuery('(min-width:600px)');
  
  const handleCreateUser = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const userData = {
      name: name,
      email: email,
      password: password,
    };
    setRegisterStatus(null);
    fetch("http://localhost:3001/api/createUser", {
      body: JSON.stringify(userData),
      method: "POST",
    }).then((res) => {
      if (res.status == 201) {
        setRegisterStatus({
          success: true,
        });
        router.push("/login");
      } else {
        const data = await response.json();
        setRegisterStatus({
          error: true,
          errorDescription: data.error || "There was an error.",
        });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setRegisterStatus({
        error: true,
        errorDescription: "There was an error.",
      });
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
          flex: matches ? "0 0 60%" : "0 0 100%", // width of the white background
          borderRadius: matches ? "50px 0 0 50px" : "0px",
          backgroundColor: "white",
        }}
        component={"form"}
        onSubmit={handleCreateUser}
      >
        <div style={{ flex: 1 }} /> {/* Spacer to push content to the center */}
        <Stack textAlign="center" sx={{ marginBottom: 5 }}>
          <Typography variant="h5">Create Account</Typography>
        </Stack>
        <Stack
          direction={matches ? "row" : "column"}
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
          {registerStatus && (
            <Alert
              sx={{
                width: "50%",
                mx: "auto",
              }}
              color={registerStatus?.error ? "error" : "success"}
            >
              {registerStatus?.success && "Registration successful"}
              {registerStatus?.errorDescription}
            </Alert>
          )}
          <TextField
            sx={{
              marginBottom: 5,
              marginLeft: "auto",
              marginRight: "auto",
              width: "50%",
            }} // Center the text field
            label="Full Name"
            variant="standard"
            onChange={(e) => setName(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
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
          type="submit"
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
