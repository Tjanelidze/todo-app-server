import express from 'express';
import userRouter from './routes/userRoutes.js';
import todoRouter from './routes/todoRoutes.js';

const app = express();

app.use(express.json());

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/todos', todoRouter);

export default app;
