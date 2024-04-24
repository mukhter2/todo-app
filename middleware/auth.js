const express = require('express');
const jwt = require('jsonwebtoken');

const { getUserByToken } = require('../service/user/user.service'); // Assuming user service

const authorize = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await getUserByToken(decoded._id);
    if (!req.user) {
      return res.status(401).send({ error: 'Invalid token' });
    }
    next();
  } catch (error) {
    res.status(401).send({ error: 'Unauthorized' });
  }
};

module.exports = authorize;
