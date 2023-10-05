import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import { Grid } from "@mui/material";

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
        {/* You can add content here if needed */}
      </div>

      {/* Right Side - White with Login Form */}
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Center horizontally
          flex: "0 0 70%", // Take up 70% of the viewport width
          borderRadius: "50px",
          backgroundColor: "white", // Set the background color to white
        }}
      >
        <div style={{ flex: 1 }} /> {/* Spacer to push content to the center */}
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <TextField
          sx={{ marginBottom: 1 }}
          label="Email"
          variant="outlined"
          style={{ width: "50%" }}
        />
        <TextField
          sx={{ marginBottom: 1 }}
          label="Password"
          type="password"
          variant="outlined"
          style={{ width: "50%" }}
        />
        <Grid container sx={{ marginTop: 1 }}>
          <Grid item xs={6} sx={{ textAlign: "left" }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Remember me"
              sx={{ paddingLeft: "20px" }}
            />
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "right" }}>
            <Link href="#" sx={{ paddingRight: "20px" }}>
              Forgot Password?
            </Link>
          </Grid>
        </Grid>
        <Button
          sx={{ marginTop: 1, width: "50%" }}
          variant="contained"
          color="primary"
          onClick={handleLogin}
        >
          Log In
        </Button>
        <div style={{ flex: 1 }} /> {/* Spacer to push content to the center */}
      </Paper>
    </Box>
  );
};

export default LoginPage;
