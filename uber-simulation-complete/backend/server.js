// backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

import validateEnv from './middleware/validateEnv.js';
import errorHandler from './middleware/errorHandler.js';

import rideRoutes from './routes/rideRoutes.js';
import driverRoutes from './routes/driverRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import billingRoutes from './routes/billingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

import { connectMySQL, connectMongo } from './config/db.js';

// Load environment variables
dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to databases
await connectMySQL();
await connectMongo();

// Mount entity routes
app.use('/api/rides', rideRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/status', (req, res) => {
  res.json({ status: 'Backend OK', timestamp: Date.now() });
});

// Global error handler
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`🔄 Backend listening on port ${PORT}`);
});
// backend server.js
