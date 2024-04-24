const {
  createTodoList,
  findTodoLists,
  findTodoListById,
  updateTodoList,
  deleteTodoList,
  doesTodoListExist,
} = require('../../service/todoList/todoList.service');

const createTodoListHandler = async (req, res) => {
  try {
    const todoData = req.body;
    const createdBy = req.user._id;
    todoData.createdBy = createdBy;
    const newTodo = await createTodoList(todoData);
    return res
      .status(201)
      .json({ message: 'Todo List created successfully', todo: newTodo });
  } catch (error) {
    // Handle errors
    console.error(error);
    return res.status(error.status || 500).json({ message: error.message });
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
      return res.status(200).json({ todos: [] });
    }
    return res.status(200).json({ todos });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving todos' });
  }
};

const getTodoListByIdHandler = async (req, res) => {
  try {
    const todoId = req.params.todoListId;
    const populate = [{ path: 'createdBy' }];

    const todos = await findTodoListById(todoId, '', populate);
    return res.status(200).json({ todos });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving todos' });
  }
};

const updateTodoListHandler = async (req, res) => {
  try {
    const todoId = req.params.todoListId;
    const updateData = req.body || {}; // Allow empty update data
    const updatedTodo = await updateTodoList(todoId, updateData);
    return res
      .status(200)
      .json({ message: 'Todo updated successfully', todo: updatedTodo });
  } catch (error) {
    // Handle errors
    console.error(error);
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const deleteTodoListHandler = async (req, res) => {
  try {
    const todoId = req.params.todoListId;
    const deletedTodo = await deleteTodoList(todoId);
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
  createTodoListHandler,
  getAllTodoListsHandler,
  deleteTodoListHandler,
  updateTodoListHandler,
  getTodoListByIdHandler,
};
