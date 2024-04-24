const express = require('express');
const mongoose = require('mongoose'); // Only needed if not using .env
const bodyParser = require('body-parser'); // Import body-parser
require('dotenv').config(); // Load environment variables from .env (optional)

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // Parse JSON data in request body

// Connect to MongoDB using connection string from .env
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

const todoRoutes = require('./server/todo/todo.route');
app.use('/api/todos', todoRoutes);

const todoListRoutes = require('./server/todoList/todoList.route');
app.use('/api/todoLists', todoListRoutes);

app.listen(port, () => console.log(`Server listening on port ${port}`));
