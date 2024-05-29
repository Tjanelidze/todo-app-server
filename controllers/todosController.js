import Todo from '../models/todoModel.js';

const createTodo = async (req, res, next) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createTodo,
};
