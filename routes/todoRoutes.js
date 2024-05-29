import express from 'express';
import todosController from '../controllers/todosController.js';

const router = express.Router();

router.get('/', () => {
  console.log('coming soon');
});

router.post('/', todosController.createTodo);

export default router;
