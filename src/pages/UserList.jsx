// ** MUI Imports
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';



import { useState, useEffect } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types';

const statusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' },
};

const DashboardTable = () => {
  const [rows, setRows] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false); // Add this line
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    // Fetch data from your backend API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/users');
        setRows(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // const handleEdit = async (userId) => {
  //   const navigate = useNavigate();
  
  //   // Fetch the user details by ID
  //   try {
  //     const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
  //     const user = response.data;
  
  //     // Redirect to the edit page with user ID as a parameter
  //     navigate(`/EditUser/${userId}`);
  //   } catch (error) {
  //     console.error('Error fetching user details:', error);
  //   }
  // };
  const handleEdit = async (userId) => {
    // Fetch the user details by ID
    try {
      const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
      const user = response.data;

      // Open the edit dialog and set the user being edited
      setEditingUser(user);
      setOpenEditDialog(true);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleEditDialogClose = () => {
    // Close the edit dialog
    setOpenEditDialog(false);
    setEditingUser(null); // Clear the user being edited
  };

  const handleEditUserUpdate = async () => {
    try {
      const userId = editingUser.id; // Assuming there is an 'id' property in your user object
      const response = await axios.put(`http://localhost:3000/api/admin/users/${userId}`, editingUser);

      console.log(response.data); // Log the server response

      // Update the local 'rows' state with the edited user
      setRows((prevRows) =>
        prevRows.map((user) => (user.id === userId ? { ...user, ...editingUser } : user))
      );

      // Show notification after successful update
      setNotification({ open: true, message: 'User updated successfully', severity: 'success' });

      // Close the edit dialog
      handleEditDialogClose();
    } catch (error) {
      console.error('Error updating user details:', error);
      // Show error notification
      setNotification({ open: true, message: 'Error updating user', severity: 'error' });
    }
  };

  const handleDelete = async (userId) => {
    // Send a request to delete the user by ID
    try {
      const response = await axios.delete(`http://localhost:3000/api/users/${userId}`);
      console.log(response.data); // Log the server response

      setRows((prevRows) => prevRows.filter((user) => user.id !== userId));
      
      // Show notification after successful deletion
      setNotification({ open: true, message: 'User deleted successfully', severity: 'success' });

    } catch (error) {
      console.error('Error deleting user:', error);
      // Show error notification
      setNotification({ open: true, message: 'Error deleting user', severity: 'error' });
  
    }
  };

  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotification({ ...notification, open: false });
  };

  const handleLogout = async () => {
    // Send a request to logout the admin
    try {
      const response = await axios.post('http://localhost:3000/api/admin/logout');
      console.log(response.data); // Log the server response
      // Implement any additional logic, such as redirecting to the login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Top Header Panel */}
        <header className="col-md-12 bg-light d-flex justify-content-between align-items-center p-3">
          <h2>PetAdmin</h2>
          <Button variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </header>

        {/* Left Side Navigation Panel */}
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Users
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/PetList">
                  Pets
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main role="main" className="col-md-10 px-4">
          <Card>
            <TableContainer>
              <Table className="table" aria-label="table in dashboard">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Actions</TableCell> 
                  </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.age}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    
                    <TableCell>
                      <Button variant="outlined" onClick={() => handleEdit(row.id)}>
                        Edit
                      </Button>
                      <Button variant="outlined" onClick={() => handleDelete(row.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              </Table>
            </TableContainer>
          </Card>
          {/* Notification Snackbar */}
          <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification}>
            <MuiAlert elevation={6} variant="filled" onClose={handleCloseNotification} severity={notification.severity}>
              {notification.message}
            </MuiAlert>
          </Snackbar>
           {/* Edit User Dialog */}
          <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
              {/* Add your form fields for editing user details */}
              <TextField
                label="Name"
                value={editingUser ? editingUser.name : ''}
                onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                value={editingUser ? editingUser.email : ''}
                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Address"
                value={editingUser ? editingUser.address : ''}
                onChange={(e) => setEditingUser({ ...editingUser, address: e.target.value })}
                fullWidth
                margin="normal"
              />
              {/* ... (other form fields) */}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditDialogClose}>Cancel</Button>
              <Button onClick={handleEditUserUpdate}>Update User</Button>
            </DialogActions>
          </Dialog>

        </main>
      </div>
    </div>
  );
  
};

export default DashboardTable;
