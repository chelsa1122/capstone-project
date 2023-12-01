import express from 'express';
import db from '../../db.js';

const router = express.Router();

// Function to get services available for pets in a specific location
const getServicesByLocation = (req, res) => {
  // Extract location from request parameters or query string
  const location = req.params.location || req.query.location;
  const pet = req.params.location || req.query.location;
  const service = req.params.location || req.query.location;

  // if (!location) {
  //   return res.status(400).json({ error: 'Location is required' });
  // }

  // Query to get services based on the location
  let query = 'SELECT * FROM services WHERE';

  if (location && pet && service) {
    query += ' service_location = ? AND pet = ? AND service = ?';
  } else if (location && pet) {
    query += ' service_location = ? AND pet = ?';
  } else if (location && service) {
    query += ' service_location = ? AND service = ?';
  } else if (pet && service) {
    query += ' pet = ? AND service = ?';
  } else if (location) {
    query += ' service_location = ?';
  } else if (pet) {
    query += ' pet = ?';
  } else if (service) {
    query += ' service = ?';
  } else {
    query ='SELECT * FROM services';
  }

  db.query(query, [location], (error, results) => {
    if (error) {
      console.error('Error fetching services:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    } else {
      return res.json(results);
    }
  });
};

// Define the API route
router.get('/services/:location', getServicesByLocation);

export default router;
