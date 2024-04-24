const express = require('express');
const {
  createTodoListHandler,
  getAllTodoListsHandler,
  deleteTodoListHandler,
  updateTodoListHandler,
  getTodoListByIdHandler,
} = require('./todoList.controller');

const router = express.Router();

router.post('/', createTodoListHandler);
router.get('/', getAllTodoListsHandler);
router.get('/:todoListId', getTodoListByIdHandler);
router.put('/:todoListId', updateTodoListHandler);
router.delete('/:todoListId', deleteTodoListHandler);

module.exports = router;
