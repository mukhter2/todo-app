const express = require('express');
const router = express.Router();

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

router.route('/login').post(loginCtrl);
router.route('/register').post(registerCtrl);
router.route('/forget-password').post(forgotPasswordCtrl);
router.route('/reset-password').post(resetPasswordCtrl);

module.exports = router;
