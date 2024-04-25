const express = require('express');
const {
  createTodoHandler,
  getAllTodosHandler,
  getTodoByIdHandler,
  updateTodoHandler,
  deleteTodoHandler,
  getAllTodosByListHandler,
} = require('./todo.controller');
const todoValidation = require('./todo.validation');

const authorize = require('../../middleware/auth'); // Import the middleware
const schemaValidator = require('../../helpers/schemaValidator');

const router = express.Router();

router
  .route('/')
  .post(
    authorize,
    schemaValidator(todoValidation.createTodo),
    createTodoHandler,
  )
  .get(authorize, getAllTodosHandler);

router.route('/list/:todoListId').get(authorize, getAllTodosByListHandler);
router
  .route('/:todoId')
  .get(authorize, getTodoByIdHandler)
  .put(authorize, schemaValidator(todoValidation.updateTodo), updateTodoHandler)
  .delete(
    authorize,
    schemaValidator(todoValidation.deleteTodo),
    deleteTodoHandler,
  );

module.exports = router;
