// LoginPage.jsx

import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

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
      console.log(response);
      console.log();
      
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
    <div>
      <h2>Admin Login</h2>
      {loginStatus && (
        <p style={{ color: loginStatus.success ? 'green' : 'red' }}>
          {loginStatus.success ? 'Login successful' : 'Login failed'}
        </p>
      )}
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleAdminLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
