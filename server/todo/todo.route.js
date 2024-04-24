const express = require('express');
const {
  createTodoHandler,
  getAllTodosHandler,
  getTodoByIdHandler,
  updateTodoHandler,
  deleteTodoHandler,
  getAllTodosByListHandler,
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

router
  .route('/')
  .post(authorize, createTodoHandler)
  .get(authorize, getAllTodosHandler);

router.route('/list/:todoListId').get(authorize, getAllTodosByListHandler);
router
  .route('/:todoId')
  .get(authorize, getTodoByIdHandler)
  .put(authorize, updateTodoHandler)
  .delete(authorize, deleteTodoHandler);

module.exports = router;
