import express from 'express';
import db from '../../db.js';
import session from 'express-session';
import fetch from 'node-fetch';

const router = express.Router();


const getUserData = (req, res) => {
  const query = 'SELECT * FROM users'; 

  db.query(query, (error, results) => {

    console.log(results);
    if (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log(results);
      res.json(results);
    }
  });
};

export { getUserData };


// Session in-memory storage  
router.use(
  session({
    secret: 'PETPAL@13',
    resave: false,
    saveUninitialized: true,
  })
);
// Function to create a new user
router.post('/createUser', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      throw new Error('Name, email, and password are required');
    }

    const user = { name, email, password };
    const insertQuery = 'INSERT INTO user SET ?';
    const insertResult = await db.query(insertQuery, user);

    // Store user data in the session
    req.session.user = user;

    console.log('User inserted:', insertResult);
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'There was an error creating the user' });
  }
});

// Function for user login
const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  if (req.session.user) {
    // User is already logged in
    return res.status(200).json({ message: 'Already logged in' });
  }

  const loginQuery = 'SELECT * FROM user WHERE email = ? AND password = ?';
  const loginValues = [email, password];

  db.query(loginQuery, loginValues, (loginError, loginResults) => {
    if (loginError) {
      console.error('Error executing the query: ' + loginError);
      return res.status(500).json({ error: 'Database error' });
    }

    if (loginResults.length === 1) {
      // Store user data in the session
       const { user_id, email } = loginResults[0];
       req.session.user = { user_id, email };

      console.log(req.session.user);
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ error: 'Authentication failed' });
    }
  });
};

// Function to update user information
const updateUser = (req, res) => {

  // Ensure the user is authenticated
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const { name, email, password, age, address } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const updateQuery = 'UPDATE user SET name = ?, password = ?, age = ?, address = ? WHERE email = ?';
  const updateValues = [name, password, age, address, email];

  db.query(updateQuery, updateValues, (updateError, updateResult) => {
    if (updateError) {
      console.error('Error updating user:', updateError);
      return res.status(500).json({ error: 'Database error' });
    }

    if (updateResult.affectedRows === 1) {
      return res.status(200).json({ message: 'User information updated successfully' });
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  });
};



// Define the API routes
// router.post('/api/createUser', createUser);
router.post('/api/login', loginUser);
router.put('/api/updateUser', updateUser);

export default router;
