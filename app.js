import express from 'express';
import session from 'express-session';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const router = express.Router();

import { fileURLToPath } from 'url';
import { dirname } from 'path';

app.use(
  session({
    secret: 'secret',
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

// cors for requests
app.use(cors());

// Serve your static files (e.g., your frontend build)
app.use(express.static(path.join(__dirname, 'src/pages')));

// Handle requests to render your index.tsx page
// app.get('/', (req, res) => {
//   // You can send your index.html file here
//   res.sendFile(path.join(__dirname, 'src/pages/index.tsx'));
// });


app.use('/api', userController);
app.use('/api', petController);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
