import express from 'express';
import db from '../../db.js';
import session from 'express-session';
import moment from 'moment';

const router = express.Router();

  // Function to create a new appointment detail
  const createAppointment = (req, res) => {
  const userId = req.session.user.user_id;
  if(userId == null){
    return res.status(400).json({error: "unauthorized access. login first."});
  }
  const serviceId = req.body.serviceId;
  const appointmentStartDate = req.body.appointmentStartDate;
  if(serviceId == null || appointmentStartDate == null){
    return res.status(400).json({error: "make sure all params provided"});
  }

  // Format the date in MySQL-compatible format
  const formattedDate = moment(appointmentStartDate).format('YYYY-MM-DD HH:mm:ss');

  // Check if an appointment already exists for the given user, service, and date
  const checkQuery = `
    SELECT id FROM appointments
    service_id = ? AND start_date_time = ?;
  `;

  connection.query(checkQuery, [serviceId, formattedDate], (err, results) => {
    if (err) {
      console.error('Error checking existing appointment:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length > 0) {
      console.log('Appointment already exists for the given user, service, and date', userId, serviceId, formattedDate);
      return res.status(200).json({ error: 'Appointment already exists!' });

    } else {
      // Create a new appointment
      var endDateTime = moment(appointmentStartDate).add(1, 'hours');
      const formattedEndDate = endDateTime.format('YYYY-MM-DD HH:mm:ss');
      const createQuery = `
        INSERT INTO appointments (user_id, service_id, appointstart_date_time, end_date_time)
        VALUES (?, ?, ?, ?);
      `;

      connection.query(createQuery, [userId, serviceId, formattedDate, formattedEndDate], (err, results) => {
        if (err) {
          console.error('Error creating appointment:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        console.log('New appointment created successfully');
        return res.status(201).json({message: "Appointment created successfully"});
      });
    }
  });
};

// Function to retrieve appointment details
const getAppointments = (req, res) => {
  // Assuming there's a 'user_id' in the session representing the logged-in user
  const userId = req.session.user.user_id;

  const selectQuery = 'SELECT * FROM appointments WHERE user_id = ?';
  const selectValues = [userId];

  db.query(selectQuery, selectValues, (selectError, selectResults) => {
    if (selectError) {
      console.error('Error retrieving appointment details:', selectError);
      return res.status(500).json({ error: 'Database error' });
    }

    return res.status(200).json(selectResults);
  });
};


// Define the API routes for appointment details
router.post('/createAppointment', createAppointment);
router.get('/getAppointments', getAppointments);

export default router;
