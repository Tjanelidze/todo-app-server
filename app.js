import express from 'express';
import Todo from './models/todoModel.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const saltRounds = 10;

app.use(express.json());

app.post('/api/v1/todos', async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/v1/users/signup');

app.use('/api/v1/users', userRouter);

export default app;
