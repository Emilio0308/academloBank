const AppError = require('../utils/app.Error');
const UserModel = require('./../model/user.model');
const transferModel = require('./../model/transfer.model');
const catchAsync = require('./../utils/catchAsync');

exports.loggingUser = catchAsync(async (req, res, next) => {
  const { accountNumber, password } = req.body;
  const user = await UserModel.findOne({
    where: {
      accountNumber,
      password,
    },
  });
  if (!user) {
    return next(new AppError('invalid credentials', 401));
  }
  res.status(200).json({
    status: 'success',
    message: 'login succes',
  });
});

exports.singUp = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;
  const accountNumberRamdon = Math.floor(Math.random() * 900000) + 100000;

  const user = await UserModel.create({
    name,
    password,
    accountNumber: accountNumberRamdon,
    amount: 1000,
  });

  return res.status(200).json({
    message: 'succes',
    user,
  });
});

exports.historyById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const allTransfer = await transferModel.findAll({
    where: {
      senderUserId: id,
    },
  });
  if (!allTransfer) {
    return next(new AppError('no transfer found for this account', 404));
  }
  return res.status(200).json({
    message: 'all transfer found',
    status: 'succes',
    allTransfer,
  });
});
