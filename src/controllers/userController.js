import express from 'express';
import db from '../../db.js';

const router = express.Router();

// Route to create a new user
router.post('/createUser', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const user = { name, email, password };

  const insertQuery = 'INSERT INTO user (name, email, password) VALUES (?, ?, ?)';
  const insertValues = [user.name, user.email, user.password];

  db.query(insertQuery, insertValues, (insertError, insertResult) => {
    if (insertError) {
      console.error('Error inserting user:', insertError);
      return res.status(500).json({ error: 'Database error' });
    }

    console.log('User inserted:', insertResult);
    return res.status(201).json({ message: 'User created successfully' });
  });
});

// Route for user login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const loginQuery = 'SELECT * FROM user WHERE email = ? AND password = ?';
  const loginValues = [email, password];

  db.query(loginQuery, loginValues, (loginError, loginResults) => {
    if (loginError) {
      console.error('Error executing the query: ' + loginError);
      return res.status(500).json({ error: 'Database error' });
    }

    if (loginResults.length === 1) {
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ error: 'Authentication failed' });
    }
  });
});

export default router;
