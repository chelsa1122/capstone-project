import express from "express";
import db from "../../db.js";
import session from "express-session";

const router = express.Router();

// Function to create a new pet detail
const createPetDetail = (req, res) => {
  const { name, dob, weight } = req.body;

  if (!name || !dob || !weight) {
    return res
      .status(400)
      .json({ error: "Name, date of birth, and weight are required" });
  }

  // Assuming there's a 'user_id' in the session representing the logged-in user
  const userId = req.session.user.user_id;

  //for testing
  // const userId = 1;

  const insertQuery =
    "INSERT INTO pets (user_id, name, dob, weight) VALUES (?, ?, ?, ?)";
  const insertValues = [userId, name, dob, weight];

  db.query(insertQuery, insertValues, (insertError, insertResult) => {
    if (insertError) {
      console.error("Error inserting pet detail:", insertError);
      return res.status(500).json({ error: "Database error" });
    }

    console.log("Pet detail inserted:", insertResult);
    return res.status(201).json({ message: "Pet detail created successfully" });
  });
};

// Function to retrieve pet details
const getPetDetails = (req, res) => {
  // Assuming there's a 'user_id' in the session representing the logged-in user
  const { user_id: userId } = req.session.user || {};

  const selectQuery = "SELECT * FROM pets WHERE user_id = ?";
  const selectValues = [userId];

  db.query(selectQuery, selectValues, (selectError, selectResults) => {
    if (selectError) {
      console.error("Error retrieving pet details:", selectError);
      return res.status(500).json({ error: "Database error" });
    }

    return res.status(200).json(selectResults);
  });
};

// Function to delete a pet detail
const deletePetDetail = (req, res) => {
  // Assuming there's a 'user_id' in the session representing the logged-in user
  const userId = req.session.user.user_id;

  // Assuming there's a 'pet_id' provided in the request to identify the pet detail to delete
  const petId = req.query.pet_id;

  if (!petId) {
    return res.status(400).json({ error: "Pet ID is required" });
  }

  const deleteQuery = "DELETE FROM pets WHERE user_id = ? AND id = ?";
  const deleteValues = [userId, petId];

  db.query(deleteQuery, deleteValues, (deleteError, deleteResult) => {
    if (deleteError) {
      console.error("Error deleting pet detail:", deleteError);
      return res.status(500).json({ error: "Database error" });
    }

    if (deleteResult.affectedRows === 1) {
      return res
        .status(200)
        .json({ message: "Pet detail deleted successfully" });
    } else {
      return res.status(404).json({ error: "Pet detail not found" });
    }
  });
};

// Function to update pet details
const updatePetDetails = (req, res) => {
  const { name, dob, weight } = req.body;

  if (!name && !dob && !weight) {
    return res.status(400).json({ error: "No fields to update provided" });
  }

  // Assuming there's a 'user_id' in the session representing the logged-in user
  const userId = req.session.user.user_id;
  // const userId = 1;

  // Assuming there's a 'pet_id' provided in the request to identify the pet detail to update
  const petId = req.body.pet_id;

  if (!petId) {
    return res.status(400).json({ error: "Pet ID is required" });
  }

  const updateValues = [];

  let updateQuery = "UPDATE pets SET ";

  if (name) {
    updateQuery += "name = ?, ";
    updateValues.push(name);
  }

  if (dob) {
    updateQuery += "dob = ?, ";
    updateValues.push(dob);
  }

  if (weight) {
    updateQuery += "weight = ?, ";
    updateValues.push(weight);
  }

  updateQuery = updateQuery.slice(0, -2); // Remove the trailing comma and space
  updateQuery += " WHERE user_id = ? AND id = ?";
  updateValues.push(userId, petId);

  if (updateValues.length === 2) {
    return res
      .status(400)
      .json({ error: "No valid fields to update provided" });
  }

  db.query(updateQuery, updateValues, (updateError, updateResult) => {
    if (updateError) {
      console.error("Error updating pet details:", updateError);
      return res.status(500).json({ error: "Database error" });
    }

    if (updateResult.affectedRows === 1) {
      return res
        .status(200)
        .json({ message: "Pet details updated successfully" });
    } else {
      return res.status(404).json({ error: "Pet not found" });
    }
  });
};

// Define the API routes for pet details
router.post("/createPetDetail", createPetDetail);
router.get("/getPetDetails", getPetDetails);
router.delete("/deletePetDetail", deletePetDetail);
router.put("/updatePetDetails", updatePetDetails);

export default router;
