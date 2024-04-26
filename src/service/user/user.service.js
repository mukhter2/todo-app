const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('../../server/user/user.model');

const register = async (userData) => {
  const user = new User(userData);
  const hashedUser = await passwordHashing(user);

  await hashedUser.save();
  const token = await generateAuthToken(hashedUser);
  return { user, token };
};

const login = async (email, password) => {
  const user = await findByCredentials(email, password);
  const token = await generateAuthToken(user);
  return { user, token };
};

const passwordHashing = async (user) => {
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  return user;
};

const generateAuthToken = async (user) => {
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  return token;
};

const findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Login failed. Invalid email or password');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Login failed. Invalid email or password');
  }
  return user;
};

const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const updateUser = async (id, updates) => {
  const allowedUpdates = ['username', 'email'];
  const updateObject = Object.keys(updates).reduce((acc, key) => {
    if (allowedUpdates.includes(key)) {
      acc[key] = updates[key];
    }
    return acc;
  }, {});

  const user = await User.findByIdAndUpdate(id, updateObject, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

// Delete a user
const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Email not found'); // Avoid revealing user existence for security
  }

  // Generate a random reset token with expiration
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenExpiration = Date.now() + 1000 * 60 * 60;

  user.resetToken = resetToken;
  user.resetTokenExpiration = resetTokenExpiration;
  await user.save();

  return resetToken;
};

const resetPassword = async (resetToken, newPassword) => {
  const user = await User.findOne({
    resetToken,
    resetTokenExpiration: { $gt: Date.now() },
  });
  if (!user) {
    throw new Error('Invalid or expired password reset token');
  }

  user.password = newPassword; // Hash the new password
  user.resetToken = undefined;
  user.resetTokenExpiration = undefined;
  await passwordHashing(user); // Use the password hashing function
  await user.save();

  return { message: 'Password reset successful' };
};
const getUserByToken = async (tokenId) => {
  if (!mongoose.isValidObjectId(tokenId)) {
    return null;
  }
  try {
    const user = await User.findOne({ _id: tokenId });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
module.exports = {
  register,
  login,
  findByCredentials,
  generateAuthToken,
  passwordHashing,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
  getUserByToken,
};
