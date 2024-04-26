const { infoLog, errorLog } = require('../../helpers/loggerInfo');
const {
  createTodoList,
  findTodoLists,
  findTodoListById,
  updateTodoList,
  deleteTodoList,
  doesTodoListExist,
} = require('../../service/todoList/todoList.service');
const { findTodos, deleteTodo } = require('../../service/todo/todo.service');

const createTodoListHandler = async (req, res) => {
  try {
    const todoData = req.body;
    const createdBy = req.user._id;
    todoData.createdBy = createdBy;
    const newTodo = await createTodoList(todoData);
    infoLog('Todo created Successfully');
    return sendJSONresponse(res, 201, {
      success: true,
      message: 'New Todo List created successfully',
      _todo: newTodo,
    });
  } catch (error) {
    errorLog(error);
    return sendErrorResponse(res, 500, 'NotFound', {
      message: 'Todo List Failed to be created',
    });
  }
};

const getAllTodoListsHandler = async (req, res) => {
  try {
    const todos = await findTodoLists(
      { createdBy: req.user._id },
      '',
      { createdAt: 'desc' },
      0,
      [{ path: 'createdBy' }],
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
      message: 'Error retrieving todo list',
    });
  }
};

const getTodoListByIdHandler = async (req, res) => {
  try {
    const todoId = req.params.todoListId;
    const populate = [{ path: 'createdBy' }];

    const todos = await findTodoListById(todoId, '', populate);
    return sendJSONresponse(res, 200, {
      success: true,
      _todo: todos,
    });
  } catch (error) {
    errorLog(error);
    return sendErrorResponse(res, 500, 'NotFound', {
      message: 'Error retrieving todo list',
    });
  }
};

const updateTodoListHandler = async (req, res) => {
  try {
    const todoId = req.params.todoListId;
    const updateData = req.body || {}; // Allow empty update data
    const updatedTodo = await updateTodoList(todoId, updateData);
    infoLog('Todo updated successfully');
    return sendJSONresponse(res, 200, {
      success: true,
      message: ' Todo List updated successfully',
      _todo: updatedTodo,
    });
  } catch (error) {
    errorLog(error);
    return sendErrorResponse(res, 500, 'CustomError', {
      message: 'Error updating todo list',
    });
  }
};

const deleteTodoListHandler = async (req, res) => {
  try {
    const todoId = req.params.todoListId;
    const todos = await findTodos(
      { createdBy: req.user._id, todoList: todoId },
      '',
      { createdAt: 'desc' },
      0,
      [{ path: 'todoList' }, { path: 'createdBy' }],
    );
    for (const todo of todos) {
      try {
        await deleteTodo(todo._id);
        infoLog(`Todo with ID ${todo._id} deleted successfully.`);
      } catch (error) {
        errorLog(`Error deleting todo with ID ${todo._id}:`, error);
      }
    }
    const deletedTodo = await deleteTodoList(todoId);
    if (!deletedTodo) {
      return sendErrorResponse(res, 404, 'NotFoundError', {
        message: 'Todo list not found',
      });
    }
    infoLog('Todo deleted successfully');
    return sendJSONresponse(res, 200, {
      success: true,
      message: ' Todo list deleted successfully',
    });
  } catch (error) {
    errorLog(error);
    return sendErrorResponse(res, 500, 'CustomError', {
      message: 'Error deleting todo list',
    });
  }
};

module.exports = {
  createTodoListHandler,
  getAllTodoListsHandler,
  deleteTodoListHandler,
  updateTodoListHandler,
  getTodoListByIdHandler,
};
