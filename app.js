import express from 'express';
import userRouter from './routes/userRoutes.js';
import todoRouter from './routes/todoRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/todos', todoRouter);

export default app;
