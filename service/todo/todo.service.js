const mongoose = require('mongoose');
const Todo = require('../../server/todo/todo.model');

const doesTodoExist = async (matchQuery) => {
  return Todo.exists(matchQuery);
};

const createTodo = async (todoData) => {
  const todo = new Todo(todoData);
  return todo.save();
};

const findTodos = async (
  matchQuery = {},
  select = '',
  sort = { createdAt: 'desc' },
  limit = 0,
) => {
  return Todo.find(matchQuery).select(select).sort(sort).limit(limit).lean();
};

const findTodoById = async (todoId, select = '', populate = []) => {
  return Todo.findById(todoId).select(select).populate(populate).lean();
};

const updateTodo = async (_id, query) => {
  return Todo.findByIdAndUpdate(_id, query, {
    safe: true,
    upsert: true,
    new: true,
  });
};

const deleteTodo = async (todoId) => {
  return Todo.findByIdAndDelete(todoId);
};

module.exports = {
  createTodo,
  findTodos,
  findTodoById,
  updateTodo,
  deleteTodo,
  doesTodoExist,
};
