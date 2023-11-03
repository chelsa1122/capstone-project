import db from "../../../db";
// Function for user login
export default function handler(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const loginQuery = "SELECT * FROM user WHERE email = ? AND password = ?";
  const loginValues = [email, password];

  db.query(loginQuery, loginValues, (loginError, loginResults) => {
    if (loginError) {
      console.error("Error executing the query: " + loginError);
      return res.status(500).json({ error: "Database error" });
    }

    if (loginResults.length === 1) {
      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(401).json({ error: "Authentication failed" });
    }
  });
}
