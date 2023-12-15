import express from 'express';
import db from '../../db.js';

const router = express.Router();

// Function to get all users
const getAllUsers = (req, res) => {
  const query = 'SELECT * FROM user';

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
};

// Function to get a user by ID
const getUserById = (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT * FROM user WHERE id = ?';

  db.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length === 1) {
        res.json(results[0]);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    }
  });
};


// Function to update a user by ID
const updateUserById = (req, res) => {
  const userId = req.params.id;
  const { name, email, address } = req.body;

  const updateQuery = 'UPDATE user SET name = ?, email = ?, address = ? WHERE id = ?';
  const updateValues = [name, email, address, userId];

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

// Function to delete a user by ID
const deleteUserById = (req, res) => {
  const userId = req.params.id;
  const deleteQuery = 'DELETE FROM user WHERE id = ?';

  db.query(deleteQuery, [userId], (deleteError, deleteResult) => {
    if (deleteError) {
      console.error('Error deleting user:', deleteError);
      return res.status(500).json({ error: 'Database error' });
    }

    if (deleteResult.affectedRows === 1) {
      return res.status(200).json({ message: 'User deleted successfully' });
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  });
};

// Function for admin login
const loginAdmin = (req, res) => {
  const { username, password } = req.body;
console.log(username);
  // Check if the provided username and password are correct
  if (username === 'admin' && password === 'admin@123') {
    // Set a session variable to indicate that the admin is logged in
    req.session.adminLoggedIn = true;

    return res.status(200).json({ message: 'Admin login successful' });
  } else {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
};

const logoutAdmin = (req, res) => {
  // Clear the adminLoggedIn session variable to indicate logout
  req.session.adminLoggedIn = false;

  return res.status(200).json({ message: 'Admin logout successful' });
};

// Export the functions
export { getAllUsers, getUserById, loginAdmin, logoutAdmin };


// Define the API routes for users
router.get('/admin/login', loginAdmin);
router.post('/admin/login', loginAdmin);
router.post('/admin/logout', logoutAdmin);
router.get('/admin/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/admin/users/:id', updateUserById);
router.delete('/users/:id', deleteUserById);

// Function to get all pets
const getAllPets = (req, res) => {
  const query = 'SELECT * FROM pets';

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching pets:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
};

// Function to get a pet by ID
const getPetById = (req, res) => {
  const petId = req.params.id;
  const query = 'SELECT * FROM pets WHERE id = ?';

  db.query(query, [petId], (error, results) => {
    if (error) {
      console.error('Error fetching pet:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length === 1) {
        res.json(results[0]);
      } else {
        res.status(404).json({ error: 'Pet not found' });
      }
    }
  });
};

// Function to create a new pet
const createPet = (req, res) => {
  const { name, dateOfBirth, weight } = req.body;

  if (!name || !dateOfBirth || !weight) {
    return res.status(400).json({ error: 'Name, date of birth, and weight are required' });
  }

  const pet = { name, dateOfBirth, weight };

  const insertQuery = 'INSERT INTO pets (name, date_of_birth, weight) VALUES (?, ?, ?)';
  const insertValues = [pet.name, pet.dateOfBirth, pet.weight];

  db.query(insertQuery, insertValues, (insertError, insertResult) => {
    if (insertError) {
      console.error('Error inserting pet:', insertError);
      return res.status(500).json({ error: 'Database error' });
    }

    console.log('Pet inserted:', insertResult);
    return res.status(201).json({ message: 'Pet created successfully' });
  });
};

// Function to update a pet by ID
const updatePetById = (req, res) => {
  const petId = req.params.id;
  const { name, dateOfBirth, weight } = req.body;

  if (!name || !dateOfBirth || !weight) {
    return res.status(400).json({ error: 'Name, date of birth, and weight are required' });
  }

  const updateQuery = 'UPDATE pets SET name = ?, date_of_birth = ?, weight = ? WHERE id = ?';
  const updateValues = [name, dateOfBirth, weight, petId];

  db.query(updateQuery, updateValues, (updateError, updateResult) => {
    if (updateError) {
      console.error('Error updating pet:', updateError);
      return res.status(500).json({ error: 'Database error' });
    }

    if (updateResult.affectedRows === 1) {
      return res.status(200).json({ message: 'Pet information updated successfully' });
    } else {
      return res.status(404).json({ error: 'Pet not found' });
    }
  });
};

// Function to delete a pet by ID
const deletePetById = (req, res) => {
  const petId = req.params.id;
  const deleteQuery = 'DELETE FROM pets WHERE id = ?';

  db.query(deleteQuery, [petId], (deleteError, deleteResult) => {
    if (deleteError) {
      console.error('Error deleting pet:', deleteError);
      return res.status(500).json({ error: 'Database error' });
    }

    if (deleteResult.affectedRows === 1) {
      return res.status(200).json({ message: 'Pet deleted successfully' });
    } else {
      return res.status(404).json({ error: 'Pet not found' });
    }
  });
};

// Define the API routes for pets
router.get('/admin/pets', getAllPets);
router.get('/pets/:id', getPetById);
router.post('/pets', createPet);
router.put('/pets/:id', updatePetById);
router.delete('/pets/:id', deletePetById);

// Export the router
export default router;
