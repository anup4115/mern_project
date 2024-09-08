import express from 'express';
import cors from 'cors';
import connectDB from './db/connectdb.js';
import web from './routes/CreateUser.js';
import DisplayData from './routes/DisplayData.js'
import OrderData from './routes/OrderData.js'
import dotenv from 'dotenv'

dotenv.config()

// Load environment variables from .env file

const app = express();
const port = process.env.PORT || '3001';

// Middleware
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000', // Use env variable for client origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
}));

app.use(express.json()); // To parse JSON bodies


// Connect to the database
connectDB();

// Routes
app.use('/api', web); // Mount the routes
app.use('/api', DisplayData); // Mount the routes
app.use('/api', OrderData); // Mount the routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).json({ error: 'Something went wrong!' }); // Send a generic error message
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
