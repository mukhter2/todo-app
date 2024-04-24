const mongoose = require('mongoose');
const { Schema } = mongoose;

const TodoSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 250, // Optional description field
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;
