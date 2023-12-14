import {
	Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Rating,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  SvgIcon,
  Link,
  Paper,
  InputAdornment,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import urls from "../constants/urls";

const LoginPopupForm = function({redirectUri, children}){
	const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState<any>(null);
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
        window.location.href = redirectUri || "/pet-details";
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

	return(
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
	);	
};

export default LoginPopupForm;