import Navbar from "@/components/Navbar";
import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

function HomePage() {
  return (
    <Box>
      <Navbar />
      <Stack
        spacing={2}
        textAlign="center"
        p={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center", 
          margin:'100px'
        }}
      >  
        <Button variant="contained" component={Link} href="/registration">
          <Typography>Sign Up</Typography>
        </Button>
        <Button variant="contained" component={Link} href="/login">
          <Typography>Login</Typography>
        </Button>
      </Stack>
    </Box>
  );
}

export default HomePage;
