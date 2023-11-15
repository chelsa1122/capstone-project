import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import db from '../../db.js';

const router = express.Router();
const server = http.createServer();
const io = new Server(server);

// Map to store connected users and their corresponding sockets
const connectedUsers = new Map();

// Middleware to check if the user is authenticated before establishing a WebSocket connection
io.use((socket, next) => {
  const userId = socket.handshake.auth.userId;

  // Check if the user is authenticated
  if (!userId) {
    return next(new Error('User not authenticated'));
  }

  // Add the user and socket to the connectedUsers map
  connectedUsers.set(userId, socket);

  return next();
});

// Event handler for a new chat message
const handleChatMessage = (message) => {
  const { senderId, receiverId, text } = message;

  // Check if both sender and receiver are connected
  if (connectedUsers.has(senderId) && connectedUsers.has(receiverId)) {
    // Send the message to the receiver
    connectedUsers.get(receiverId).emit('message', { senderId, text });
  }
};

// Configure WebSocket connection
io.on('connection', (socket) => {
  const userId = socket.handshake.auth.userId;

  console.log(`User ${userId} connected`);

  // Event handler for a new chat message
  socket.on('message', handleChatMessage);

  // Event handler for user disconnection
  socket.on('disconnect', () => {
    console.log(`User ${userId} disconnected`);

    // Remove the user from the connectedUsers map
    connectedUsers.delete(userId);
  });
});

// API endpoint to initiate a chat
const initiateChat = (req, res) => {
  const { senderId, receiverId } = req.body;

  // Validate sender and receiver IDs
  if (!senderId || !receiverId) {
    return res.status(400).json({ error: 'Sender and receiver IDs are required' });
  }

  // Check if both sender and receiver are connected
  if (connectedUsers.has(senderId) && connectedUsers.has(receiverId)) {
    // Send a success response
    return res.status(200).json({ message: 'Chat initiated successfully' });
  } else {
    return res.status(400).json({ error: 'Sender or receiver is not connected' });
  }
};

// Define the API route for initiating a chat
router.post('/initiateChat', initiateChat);

// Export the router and server
export { router, server };
