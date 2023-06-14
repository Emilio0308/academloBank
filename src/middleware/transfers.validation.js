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

exports.tranfersValidation = [
  body('senderAccount')
    .notEmpty()
    .withMessage('account is mandatory')
    .isLength({ min: 6 })
    .withMessage('account must be at least 6 charcaters long'),
  body('receiverAccount')
    .notEmpty()
    .withMessage('receiver account is mandatory')
    .isLength({ min: 6 })
    .withMessage('account must be at least 6 charcaters long'),
  body('amountToTransfer').notEmpty().withMessage('amount cannot be empty'),
  validateFields
];
