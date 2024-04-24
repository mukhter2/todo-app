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

router.post('/', authorize, createTodoListHandler);
router.get('/', authorize, getAllTodoListsHandler);
router.get('/:todoListId', authorize, getTodoListByIdHandler);
router.put('/:todoListId', authorize, updateTodoListHandler);
router.delete('/:todoListId', authorize, deleteTodoListHandler);

module.exports = router;
