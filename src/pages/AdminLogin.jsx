// LoginPage.jsx

import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';


const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null);

  const handleAdminLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/admin/login', {
        username: username,
        password: password,
      });
      
      if (response.status === 200) {
        // Admin login successful
        setLoginStatus({ success: true });
        // Redirect to admin panel or perform other actions
        router.push('/UserList');
      }
    } catch (error) {
      setLoginStatus({ error: true });
    }
  };

  return (
    <div className="container mt-5">
      <div className="col-md-6 offset-md-3">
        <h2 className="text-center mb-4">Admin Login</h2>
        {loginStatus && (
          <p className={`text-center ${loginStatus.success ? 'text-success' : 'text-danger'}`}>
            {loginStatus.success ? 'Login successful' : 'Login failed'}
          </p>
        )}
        <form>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="button" className="btn btn-primary" onClick={handleAdminLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
