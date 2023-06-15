const express = require('express');
const {
  loggingUser,
  singUp,
  historyById,
} = require('../controllers/users.controller');

const {
  createUserValidation,
  logingUserValidation,
} = require('../middleware/validations.middleware');
const { validUserById } = require('../middleware/validUserById.middleware');

const {
  protect,
  protectAccountOwner,
} = require('../middleware/auth.middleware');

const route = express.Router();

route.post('/signup', createUserValidation, singUp);
route.post('/login', logingUserValidation, loggingUser);
route.get(
  '/:id/history',
  protect,
  validUserById,
  protectAccountOwner,
  historyById
);

module.exports = route;
