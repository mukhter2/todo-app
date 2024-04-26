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
const {
  loggerInfo,
  loggerError,
  infoLog,
  errorLog,
} = require('../../helpers/loggerInfo');
const {
  sendJSONresponse,
  sendErrorResponse,
} = require('../../helpers/jsonResponse');
const registerCtrl = async (req, res) => {
  try {
    const { user, token } = await register(req.body);
    infoLog('New User created Successfully');
    return sendJSONresponse(res, 201, {
      success: true,
      message: 'New Todo List created successfully',
      user,
      token,
    });
  } catch (error) {
    errorLog(error);
    return sendErrorResponse(res, 400, 'BadRequest', {
      message: 'Registrtion failed',
    });
  }
};

const loginCtrl = async (req, res) => {
  try {
    const { user, token } = await login(req.body.email, req.body.password);
    return sendJSONresponse(res, 200, {
      success: true,
      user,
      token,
    });
  } catch (error) {
    errorLog(error);
    return sendErrorResponse(res, 400, 'BadRequest', {
      message: 'Error during log in',
    });
  }
};
const getAllUsersCtrl = async (req, res) => {
  try {
    const users = await getAllUsers();
    return sendJSONresponse(res, 200, {
      users,
    });
  } catch (error) {
    errorLog(error);
    return sendErrorResponse(res, 400, 'BadRequest', {
      message: 'Failed to retrive users',
    });
  }
};

const getUserByIdCtrl = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await getUserById(id);
    if (!user) {
      return sendErrorResponse(res, 404, 'NotFoundError', {
        message: 'user not found',
      });
    }
    return sendJSONresponse(res, 200, {
      success: true,
      user,
    });
  } catch (error) {
    errorLog(error);
    return sendErrorResponse(res, 400, 'BadRequest', {
      message: 'Failed to retrive user',
    });
  }
};

const updateUserCtrl = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  try {
    const user = await updateUser(id, updates);
    if (!user) {
      return sendErrorResponse(res, 404, 'NotFoundError', {
        message: 'user not found',
      });
    }
    return sendJSONresponse(res, 200, {
      success: true,
      message: 'user successfully updated',
      user,
    });
  } catch (error) {
    errorLog(error);
    return sendErrorResponse(res, 400, 'BadRequest', {
      message: 'Failed to update user',
    });
  }
};

const deleteUserCtrl = async (req, res) => {
  const id = req.params.id;
  try {
    await deleteUser(id);
    infoLog('User deleted successfully');
    return sendJSONresponse(res, 200, {
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    errorLog(error);
    return sendErrorResponse(res, 400, 'BadRequest', {
      message: 'Failed to delete user',
    });
  }
};

const forgotPasswordCtrl = async (req, res) => {
  const email = req.body.email;
  try {
    const resetToken = await forgotPassword(email);
    infoLog('forget password token successfully generated');
    return sendJSONresponse(res, 200, {
      success: true,
      resetToken,
    });
  } catch (error) {
    errorLog(error);
    return sendErrorResponse(res, 400, 'BadRequest', {
      message: 'Failed to forget password for user',
    });
  }
};

const resetPasswordCtrl = async (req, res) => {
  const resetToken = req.body.resetToken;
  const newPassword = req.body.newPassword;
  try {
    await resetPassword(resetToken, newPassword);
    infoLog('Password reset successful');
    return sendJSONresponse(res, 201, {
      success: true,
      message: 'Password reset successful',
    });
  } catch (error) {
    errorLog(error);
    return sendErrorResponse(res, 400, 'BadRequest', {
      message: 'Failed to reset password',
    });
  }
};

module.exports = {
  registerCtrl,
  loginCtrl,
  getAllUsersCtrl,
  getUserByIdCtrl,
  updateUserCtrl,
  deleteUserCtrl,
  forgotPasswordCtrl,
  resetPasswordCtrl,
};
