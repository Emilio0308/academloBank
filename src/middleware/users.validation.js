const { body, validationResult } = require('express-validator');

const validateFields = (req, res, next) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.mapped(),
      });
    }
    next();
  };

exports.createUserValidation = [
  body('name').notEmpty().withMessage('name cannot be empty'),
  body('password')
    .notEmpty()
    .withMessage('password cannot be empty')
    .isLength({ min: 6 })
    .withMessage('password must be at least 6 characters long'),
    validateFields,
];
exports.logingUserValidation = [
  body('accountNumber')
    .notEmpty()
    .withMessage('account can not be empty')
    .isLength({ min: 6 })
    .withMessage('account must be at least 6 digist long'),
  body('password')
    .notEmpty()
    .withMessage('password can not be empty')
    .isLength({ min: 6 })
    .withMessage('password must be at least 6 digist long'),
  validateFields,
];
