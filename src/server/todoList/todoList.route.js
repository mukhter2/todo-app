const express = require('express');
const {
  createTodoListHandler,
  getAllTodoListsHandler,
  deleteTodoListHandler,
  updateTodoListHandler,
  getTodoListByIdHandler,
} = require('./todoList.controller');
const authorize = require('../../middleware/auth'); // Import the middleware
const todoValidation = require('./todoList.validation');
const schemaValidator = require('../../helpers/schemaValidator');

const router = express.Router();

router
  .route('/')
  .post(
    authorize,
    schemaValidator(todoValidation.createTodoList),
    createTodoListHandler,
  )
  .get(authorize, getAllTodoListsHandler);

router
  .route('/:todoListId')
  .get(authorize, getTodoListByIdHandler)
  .put(
    authorize,
    schemaValidator(todoValidation.updateTodoList),
    updateTodoListHandler,
  )
  .delete(
    authorize,
    schemaValidator(todoValidation.deleteTodoList),
    deleteTodoListHandler,
  );

module.exports = router;
