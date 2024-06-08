import express from 'express';
import todosController from '../controllers/todosController.js';
import authController from '../controllers/authController.js';

const router = express.Router();

router
  .route('/')
  .get(authController.protect, todosController.getAllTodos)
  .post(authController.protect, todosController.createTodo);

router
  .route('/:id')
  .patch(authController.protect, todosController.updateTodo)
  .delete(authController.protect, todosController.deleteTodo);

export default router;
