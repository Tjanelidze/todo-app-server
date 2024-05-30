import express from 'express';
import userRouter from './routes/userRoutes.js';
import todoRouter from './routes/todoRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/todos', todoRouter);

export default app;
