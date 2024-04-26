const mongoose = require('mongoose');
const TodoList = require('../../server/todoList/todoList.model');

const doesTodoListExist = async (matchQuery) => {
  return TodoList.exists(matchQuery);
};

const createTodoList = async (todoData) => {
  const todo = new TodoList(todoData);
  return todo.save();
};

const findTodoLists = async (
  matchQuery = {},
  select = '',
  sort = { createdAt: 'desc' },
  limit = 0,
  populate = [],
) => {
  return TodoList.find(matchQuery)
    .select(select)
    .sort(sort)
    .limit(limit)
    .populate(populate)
    .lean();
};

const findTodoListById = async (todoId, select = '', populate = []) => {
  return TodoList.findById(todoId).select(select).populate(populate).lean();
};

const updateTodoList = async (_id, query) => {
  return TodoList.findByIdAndUpdate(_id, query, {
    safe: true,
    upsert: true,
    new: true,
  });
};

const deleteTodoList = async (todoId) => {
  return TodoList.findByIdAndDelete(todoId);
};

module.exports = {
  createTodoList,
  findTodoLists,
  findTodoListById,
  updateTodoList,
  deleteTodoList,
  doesTodoListExist,
};
