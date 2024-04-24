const {
  createTodo,
  findTodos,
  findTodoById,
  updateTodo,
  deleteTodo,
  doesTodoExist,
} = require('../../service/todo/todo.service');

const createTodoHandler = async (req, res) => {
  try {
    const todoData = req.body;
    const createdBy = req.user._id;
    todoData.createdBy = createdBy;
    const newTodo = await createTodo(todoData);
    return res
      .status(201)
      .json({ message: 'Todo created successfully', todo: newTodo });
  } catch (error) {
    // Handle errors
    console.error(error);
    return res.status(error.status || 500).json({ message: error.message });
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
      return res.status(200).json({ todo: [] });
    }
    return res.status(200).json({ todos });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving todos' });
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
      return res.status(200).json({ todos: [] });
    }
    return res.status(200).json({ todos });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving todos' });
  }
};
const getTodoByIdHandler = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const populate = [{ path: 'todoList' }, { path: 'createdBy' }];
    const todos = await findTodoById(todoId, '', populate);
    return res.status(200).json({ todos });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving todos' });
  }
};

const updateTodoHandler = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const updateData = req.body || {}; // Allow empty update data
    const updatedTodo = await updateTodo(todoId, updateData);
    return res
      .status(200)
      .json({ message: 'Todo updated successfully', todo: updatedTodo });
  } catch (error) {
    // Handle errors
    console.error(error);
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const deleteTodoHandler = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const deletedTodo = await deleteTodo(todoId);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    return res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    // Handle errors
    console.error(error);
    return res.status(error.status || 500).json({ message: error.message });
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
