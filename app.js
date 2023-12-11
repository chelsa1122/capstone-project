// app.mjs

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import session from "express-session";
import path from "path";

const app = express();

// import servicesController from './src/controllers/servicesController.js'

<<<<<<< HEAD
=======
import { fileURLToPath } from 'url';
import { dirname } from 'path';

app.use(bodyParser.json());


// Serve your static files (e.g., your frontend build)
app.use(express.static(path.join(path.dirname(new URL(import.meta.url).pathname), 'src/pages')));

// Enable CORS for all routes
// app.use(cors({
//   origin: 'http://localhost:3001',
//   credentials: true,
// }));
app.use(cors({
  origin: true,
  credentials: true,
}));
app.post('/api/test', (req, res) => {
  req.session.user = { test: 'data' };
  res.json({ message: 'Session set successfully' });
});
>>>>>>> main
app.use(
  session({
    secret: "tanmayidev",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      sameSite: "lax",
    },
  })
);

app.use(bodyParser.json());

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

// Serve your static files (e.g., your frontend build)
app.use(
  express.static(
    path.join(path.dirname(new URL(import.meta.url).pathname), "src/pages")
  )
);

// Your controllers import statements
<<<<<<< HEAD
import adminController from "./src/controllers/adminController.js";
import petController from "./src/controllers/petController.js";
import servicesController from "./src/controllers/servicesController.js";
import userController from "./src/controllers/userController.js";

app.get("/api/check-session", (req, res) => {
  if (req.session.user) {
    res.json({ message: "Session is stored", userData: req.session.user });
  } else {
    res.json({ message: "Session is not stored" });
  }
});
app.post('/api/test-session', (req, res) => {
  req.session.test = 'Hello, Session!';
  res.json({ message: 'Session set successfully' });
});
=======
import userController from './src/controllers/userController.js';
import petController from './src/controllers/petController.js';
import servicesController from './src/controllers/servicesController.js';
import adminController from './src/controllers/adminController.js';
import appointmentController from './src/controllers/appointmentController.js';

// Routes
// cors for requests
app.use(cors());

// Serve your static files (e.g., your frontend build)
// app.use(express.static(path.join(__dirname, 'src/pages')));

// Handle requests to render your index.tsx page
// app.get('/', (req, res) => {
//   // You can send your index.html file here
//   res.sendFile(path.join(__dirname, 'src/pages/index.tsx'));
// });


app.use(cors());

const corsOptions = {
  origin: ['http://localhost:3001/', 'http://localhost:3000/'],
  credentials: true,
};

app.use(cors(corsOptions));

>>>>>>> main



app.get("/api/users", (req, res) => {
  userController.getUserData(req, res);
});

app.use("/api", userController);
app.use("/api", petController);
app.use("/api", servicesController);

app.use("/api", adminController);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
