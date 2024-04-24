const mongoose = require('mongoose');
const { Schema } = mongoose;

const TodoListSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 250,
    },
    todos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo',
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const TodoList = mongoose.model('TodoList', TodoListSchema);
module.exports = TodoList;
