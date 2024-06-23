/* eslint-disable no-console */
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';

// Importing routes
import userRouter from './routes/userRoutes.js';
import todoRouter from './routes/todoRoutes.js';

// Load environment variables from .env.local file
dotenv.config({ path: './.env.local' });

// Initialize express application
const app = express();

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes setup
app.use('/api/v1/users', userRouter);
app.use('/api/v1/todos', todoRouter);

// Connect to MongoDB
const DB = process.env.MONGODB_URI.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => console.log('DB connection successful'));

// Export the express application instance
export default app;
