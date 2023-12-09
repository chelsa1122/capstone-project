// ** MUI Imports
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState, useEffect } from 'react';
import axios from 'axios';

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

  useEffect(() => {
    // Fetch data from your backend API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/pets');
        setRows(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const handleEdit = (userId) => {
    // Implement your edit logic here
    console.log('Edit button clicked for user ID:', userId);
  };

  const handleDelete = (userId) => {
    // Implement your delete logic here
    console.log('Delete button clicked for user ID:', userId);
  };


  const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logout button clicked');
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
                    <TableCell>dob</TableCell>
                    <TableCell>Weight</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Actions</TableCell> 
                  </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.dob}</TableCell>
                    <TableCell>{row.weight}</TableCell>
                    <TableCell>{row.user}</TableCell>
                    
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
        </main>
      </div>
    </div>
  );
};

export default DashboardTable;
