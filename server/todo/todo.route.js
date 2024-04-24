const express = require('express');
const {
  createTodoHandler,
  getAllTodosHandler,
  getTodoByIdHandler,
  updateTodoHandler,
  deleteTodoHandler,
} = require('./todo.controller'); // Assuming your controller is in todo.controller.js
const {
  validateRequest,
  createTodoSchema,
  updateTodoSchema,
  deleteTodoSchema,
  getTodoByIdSchema,
} = require('./todo.validation'); // Assuming your validation is in todo.validation.js

const router = express.Router();

router.post('/', createTodoHandler);
router.get('/', getAllTodosHandler);
router.get('/:todoId', getTodoByIdHandler);
router.put('/:todoId', updateTodoHandler);
router.delete('/:todoId', deleteTodoHandler);

module.exports = router;
