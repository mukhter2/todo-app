const express = require('express');
const {
  createTodoListHandler,
  getAllTodoListsHandler,
  deleteTodoListHandler,
  updateTodoListHandler,
  getTodoListByIdHandler,
} = require('./todoList.controller');
const authorize = require('../../middleware/auth'); // Import the middleware

const router = express.Router();

router
  .route('/')
  .post(authorize, createTodoListHandler)
  .get(authorize, getAllTodoListsHandler);

router
  .route('/:todoListId')
  .get(authorize, getTodoListByIdHandler)
  .put(authorize, updateTodoListHandler)
  .delete(authorize, deleteTodoListHandler);

module.exports = router;
