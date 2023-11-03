import db from "db";
import { NextApiRequest, NextApiResponse } from "next";

export default function register(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, password } = JSON.parse(req.body);

  console.log(JSON.parse(req.body), name);
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required" });
  }

  const user = { name, email, password };

  const insertQuery =
    "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
  const insertValues = [user.name, user.email, user.password];

  db.query(insertQuery, insertValues, (insertError, insertResult) => {
    if (insertError) {
      console.error("Error inserting user:", insertError);
      return res.status(500).json({ error: "Database error" });
    }

    console.log("User inserted:", insertResult);
    return res.status(201).json({ message: "User created successfully" });
  });
}
