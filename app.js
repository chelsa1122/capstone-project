import express from 'express';
import session from 'express-session';
import path from 'path';

import bodyParser from 'body-parser'; 

const app = express();
const router = express.Router();

import { fileURLToPath } from 'url';
import { dirname } from 'path';

app.use(
  session({
    secret: 'PETPAL@3',
    resave: false,
    saveUninitialized: true,
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.json());

// Import your userController as an ES module
import userController from './src/controllers/userController.js';


// Serve your static files (e.g., your frontend build)
app.use(express.static(path.join(__dirname, 'src/pages')));

// Handle requests to render your index.tsx page
// app.get('/', (req, res) => {
//   // You can send your index.html file here
//   res.sendFile(path.join(__dirname, 'src/pages/index.tsx'));
// });


app.use('/api', userController);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
