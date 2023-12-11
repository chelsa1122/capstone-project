import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

function HomePage() {
  return (
    <Box>
      <Stack
        spacing={2}
        textAlign="center"
        p={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "100px",
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
// import React, { useState, useEffect } from 'react';
// import  getItemsFromAPI  from '../controllers/userController'; // Import the controller function

// export default function Home() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetch('/api/users') // This calls the API route to fetch users from the database
//       .then((response) => response.json())
//       .then((data) => setUsers(data))
//       .catch((error) => console.error(error));
//   }, []);

//   return (
//     <div>
//       <h1>Users List</h1>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>{user.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
