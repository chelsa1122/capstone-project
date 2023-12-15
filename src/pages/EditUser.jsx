// ** MUI Imports
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const EditUser = ({ userId }) => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    age: '',
    address: '',
  });

  useEffect(() => {
    // Fetch user details by ID
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/users/${userId}`, userDetails);
      console.log(response.data); // Log the server response
      // You can add additional logic here, such as displaying a success message

    } catch (error) {
      console.error('Error updating user details:', error);
      // You can add additional logic here, such as displaying an error message
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <main role="main" className="col-md-6 mx-auto mt-4">
          <Card className="p-4">
            <h2>Edit User</h2>
            <form>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Age"
                name="age"
                value={userDetails.age}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={userDetails.address}
                onChange={handleInputChange}
                margin="normal"
              />

              <Button variant="contained" color="primary" onClick={handleUpdateUser}>
                Update User
              </Button>
            </form>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default EditUser;
