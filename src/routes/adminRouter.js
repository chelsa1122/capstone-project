// adminRouter.js

import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, loginAdmin } from './adminController';

const router = express.Router();

// API routes for managing users
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// API route for admin login
router.post('/admin/login', loginAdmin);

// Export the router
export default router;
