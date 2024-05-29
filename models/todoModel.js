import { Schema, model } from 'mongoose';

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Todo = model('Todo', todoSchema);

export default Todo;
