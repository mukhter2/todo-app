const express = require('express');
const {
  registerCtrl,
  loginCtrl,
  getAllUsersCtrl,
  getUserByIdCtrl,
  updateUserCtrl,
  deleteUserCtrl,
  forgotPasswordCtrl,
  resetPasswordCtrl,
} = require('./user.controller');
const authorize = require('../../middleware/auth');

const router = express.Router();

router.post('/login', loginCtrl);
router.post('/register', registerCtrl);
router.post('/forget-password', forgotPasswordCtrl);
router.post('/reset-password', resetPasswordCtrl);

module.exports = router;
