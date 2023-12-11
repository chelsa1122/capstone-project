import AuthHero from "@/components/AuthHero";
import {
  Alert,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  useMediaQuery,
} from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import urls from "../constants/urls";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState<any>(null);
  const router = useRouter();
  const matches = useMediaQuery("(min-width:600px)");

  const handleLogin = async () => {
    setLoginStatus(null);

    try {
      const response = await axios.post(`${urls.apiHost}/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        setLoginStatus({ success: true });
        window.location.href = "/pet-details";
      } else {
        setLoginStatus({
          error: true,
          errorDescription: "Invalid email or password",
        });
      }
    } catch (error) {
      setLoginStatus({
        error: true,
        errorDescription: "An unknown error occurred",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: matches ? "row" : "column",
        alignItems: "stretch",
        height: "100vh",
        background: "#FFC900",
      }}
    >
      <AuthHero />
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
        <div style={{ flex: 1 }} />
        <Stack gap={2} mx="auto" width={matches ? "50%" : "80%"}>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h5">Login</Typography>
            <Typography variant="caption">
              Please enter your login details to Sign in
            </Typography>
          </div>
          {loginStatus && (
            <Alert color={loginStatus.success ? "success" : "error"}>
              {loginStatus.success && "Logged in successfully."}
              {loginStatus.errorDescription}
            </Alert>
          )}
          <TextField
            label="Email"
            autoFocus
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
                    sx={{ color: "#9E9E9E" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Stack
            direction={matches ? "row" : "column"}
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
        <div style={{ flex: 1 }} />
      </Paper>
    </Box>
  );
};

export default LoginPage;
