import Todo from '../models/todoModel.js';
import User from '../models/userModel.js';

const createTodo = async (req, res, next) => {
  try {
    const { title, description, completed, priority } = req.body;

    const user = await User.findById(req.user.id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const todo = await Todo.create({
      title,
      description,
      completed,
      priority,
      user: user.id,
    });

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: 'No document found with that ID' });
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      return res.status(404).json({ error: 'No document found with that ID' });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createTodo,
  getAllTodos,
  deleteTodo,
  updateTodo,
};
