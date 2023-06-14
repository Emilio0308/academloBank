const UserModel = require('./../model/user.model');
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
    return res.status(404).json({
      message: 'not found',
      status: 'fail',
    });
  }
  res.status(200).json({
    status: 'success',
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

exports.historyById = (req, res) => {
  const { id } = req.params;
};
