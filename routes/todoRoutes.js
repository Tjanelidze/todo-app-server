import express from 'express';
import todosController from '../controllers/todosController.js';

const router = express.Router();

router
  .route('/')
  .get(todosController.getAllTodos)
  .post(todosController.createTodo);

export default router;
