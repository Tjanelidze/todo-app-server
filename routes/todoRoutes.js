import express from 'express';
import todosController from '../controllers/todosController.js';

const router = express.Router();

router
  .route('/')
  .get(todosController.getTodos)
  .post(todosController.createTodo);

export default router;
