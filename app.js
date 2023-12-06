import express from 'express';
import session from 'express-session';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const router = express.Router();

import { fileURLToPath } from 'url';
import servicesController from './src/controllers/servicesController.js'
import { dirname } from 'path';

app.use(
  session({
    secret: 'tanmayidev',
    resave: false,
    saveUninitialized: true,
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.json());

// Import your userController as an ES module
import userController from './src/controllers/userController.js';
import petController from './src/controllers/petController.js';
import servicesController from './src/controllers/servicesController.js';
import adminController from './src/controllers/adminController.js';

// cors for requests
app.use(cors());

// Serve your static files (e.g., your frontend build)
app.use(express.static(path.join(__dirname, 'src/pages')));

// Handle requests to render your index.tsx page
// app.get('/', (req, res) => {
//   // You can send your index.html file here
//   res.sendFile(path.join(__dirname, 'src/pages/index.tsx'));
// });


app.use(cors());

const corsOptions = {
  origin: 'http://localhost:3001/',
  credentials: true,
};

app.use(cors(corsOptions));


app.get('/check-session', (req, res) => {
  if (req.session.user) {
    res.json({ message: 'Session is stored', userData: req.session.user });
  } else {
    res.json({ message: 'Session is not stored' });
  }
});

app.get('/api/users', (req, res) => {
  userController.getUserData(req, res); // Call the function 
});

app.use('/api', userController);
app.use('/api', petController);
app.use('/api', servicesController);
app.use('/api', adminController);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
