const {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
} = require('../../service/user/user.service');

const registerCtrl = async (req, res) => {
  try {
    const { user, token } = await register(req.body);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const loginCtrl = async (req, res) => {
  try {
    const { user, token } = await login(req.body.email, req.body.password);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
const getAllUsersCtrl = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve users' });
  }
};

const getUserByIdCtrl = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve user' });
  }
};

const updateUserCtrl = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  try {
    const user = await updateUser(id, updates);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteUserCtrl = async (req, res) => {
  const id = req.params.id;
  try {
    await deleteUser(id);
    res.send({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete user' });
  }
};

const forgotPasswordCtrl = async (req, res) => {
  const email = req.body.email;
  try {
    const resetToken = await forgotPassword(email);
    res.send({ resetToken });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const resetPasswordCtrl = async (req, res) => {
  const resetToken = req.body.resetToken;
  const newPassword = req.body.newPassword;
  try {
    await resetPassword(resetToken, newPassword);
    res.send({ message: 'Password reset successful' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  registerCtrl,
  loginCtrl,
  getAllUsersCtrl, // Include for admin use cases with authorization
  getUserByIdCtrl,
  updateUserCtrl,
  deleteUserCtrl,
  forgotPasswordCtrl,
  resetPasswordCtrl,
};
