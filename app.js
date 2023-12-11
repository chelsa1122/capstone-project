// app.mjs

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import session from "express-session";
import path from "path";

const app = express();

// import servicesController from './src/controllers/servicesController.js'

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

app.get('/api/get-session', (req, res) => {
  res.json({ sessionData: req.session });
});


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
