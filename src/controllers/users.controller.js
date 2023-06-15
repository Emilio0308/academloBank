const AppError = require('../utils/app.Error');
const UserModel = require('./../model/user.model');
const transferModel = require('./../model/transfer.model');
const catchAsync = require('./../utils/catchAsync');
const generateJWT = require('../utils/jwt');

exports.loggingUser = catchAsync(async (req, res, next) => {
  const { accountNumber, password } = req.body;

  const user = await UserModel.findOne({
    where: {
      accountNumber,
      password,
    },
  });

  if (!user) return next(new AppError('invalid credentials', 401));
  if (user.status !== 'active') return next(new AppError('invalid user', 401));

  //crear token y recordar consumir promesa con await//
  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    message: 'login succes',
    token,
    user: {
      name: user.name,
      accountNumber: user.accountNumber,
      amount: user.amount,
    },
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

  //crear token y recordar consumir promesa con await//
  const token = await generateJWT(user.id);

  return res.status(200).json({
    status: 'succes',
    message: 'The user has been created',
    token,
    user: {
      name: user.name,
      accountNumber: user.accountNumber,
      amount: user.amount,
    },
  });
});

exports.historyById = catchAsync(async (req, res, next) => {
  const { id } = req.sessionUser;
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
