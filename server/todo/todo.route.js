const express = require('express');
const {
  createTodoHandler,
  getAllTodosHandler,
  getTodoByIdHandler,
  updateTodoHandler,
  deleteTodoHandler,
} = require('./todo.controller');
const {
  validateRequest,
  createTodoSchema,
  updateTodoSchema,
  deleteTodoSchema,
  getTodoByIdSchema,
} = require('./todo.validation');
const authorize = require('../../middleware/auth'); // Import the middleware

const router = express.Router();

router.post('/', authorize, createTodoHandler);
router.get('/', authorize, getAllTodosHandler);
router.get('/list/:todoListId', authorize, getAllTodosHandler);
router.get('/:todoId', authorize, getTodoByIdHandler);
router.put('/:todoId', authorize, updateTodoHandler);
router.delete('/:todoId', authorize, deleteTodoHandler);

module.exports = router;
