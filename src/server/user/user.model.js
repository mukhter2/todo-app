const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    resetToken: {
      type: String,
    },
    resetTokenExpiration: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', userSchema);
module.exports = User;
