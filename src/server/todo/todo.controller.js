const {
  createTodo,
  findTodos,
  findTodoById,
  updateTodo,
  deleteTodo,
  doesTodoExist,
} = require('../../service/todo/todo.service');
const logger = require('../../../config/logger');
const {
  sendJSONresponse,
  sendErrorResponse,
} = require('../../helpers/jsonResponse');
const {
  loggerInfo,
  loggerError,
  infoLog,
  errorLog,
} = require('../../helpers/loggerInfo');
const createTodoHandler = async (req, res) => {
  try {
    const todoData = req.body;
    const createdBy = req.user._id;
    todoData.createdBy = createdBy;
    const newTodo = await createTodo(todoData);
    infoLog('Todo created Successfully');
    return sendJSONresponse(res, 201, {
      success: true,
      message: 'New Todo added in the list',
      _todo: newTodo,
    });
  } catch (error) {
    errorLog(error);
    return sendErrorResponse(res, 500, 'NotFound', {
      message: 'Todo Failed to added in the list',
    });
  }
};

const getAllTodosHandler = async (req, res) => {
  try {
    const todos = await findTodos(
      { createdBy: req.user._id },
      '',
      { createdAt: 'desc' },
      0,
      [{ path: 'todoList' }, { path: 'createdBy' }],
    );
    if (!todos) {
      infoLog('No Todo list found for this user');
      return sendJSONresponse(res, 200, {
        _todo: [],
      });
    }
    return sendJSONresponse(res, 200, {
      _todo: todos,
    });
  } catch (error) {
    errorLog(error);
    return sendErrorResponse(res, 500, 'NotFound', {
      message: 'Error retrieving todos',
    });
  }
};

const getAllTodosByListHandler = async (req, res) => {
  try {
    const todoId = req.params.todoListId;
    const todos = await findTodos(
      { createdBy: req.user._id, todoList: todoId },
      '',
      { createdAt: 'desc' },
      0,
      [{ path: 'todoList' }, { path: 'createdBy' }],
    );
    if (!todos) {
      infoLog('No Todo list found for this user');
      return sendJSONresponse(res, 200, {
        _todo: [],
      });
    }
    return sendJSONresponse(res, 200, {
      _todo: todos,
    });
  } catch (error) {
    errorLog(error);
    return sendErrorResponse(res, 500, 'NotFound', {
      message: 'Error retrieving todos',
    });
  }
};
const getTodoByIdHandler = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const populate = [{ path: 'todoList' }, { path: 'createdBy' }];
    const todos = await findTodoById(todoId, '', populate);
    return sendJSONresponse(res, 200, {
      success: true,
      _todo: todos,
    });
  } catch (error) {
    errorLog(error);
    return sendErrorResponse(res, 500, 'NotFound', {
      message: 'Error retrieving todos',
    });
  }
};

const updateTodoHandler = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const updateData = req.body || {}; // Allow empty update data
    const updatedTodo = await updateTodo(todoId, updateData);
    infoLog('Todo updated successfully');
    return sendJSONresponse(res, 200, {
      success: true,
      message: ' Todo updated successfully',
      _todo: updatedTodo,
    });
  } catch (error) {
    errorLog(error);
    return sendErrorResponse(res, 500, 'CustomError', {
      message: 'Error updating todos',
    });
  }
};

const deleteTodoHandler = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const deletedTodo = await deleteTodo(todoId);
    if (!deletedTodo) {
      return sendErrorResponse(res, 404, 'NotFoundError', {
        message: 'Todo not found',
      });
    }
    infoLog('Todo deleted successfully');
    return sendJSONresponse(res, 200, {
      success: true,
      message: ' Todo deleted successfully',
    });
  } catch (error) {
    errorLog(error);
    return sendErrorResponse(res, 500, 'CustomError', {
      message: 'Error deleting todos',
    });
  }
};

module.exports = {
  createTodoHandler,
  getAllTodosHandler,
  deleteTodoHandler,
  updateTodoHandler,
  getTodoByIdHandler,
  getAllTodosByListHandler,
};
