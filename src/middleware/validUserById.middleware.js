const UserModel = require('../model/user.model');
const AppError = require('../utils/app.Error');
const catchAsync = require('../utils/catchAsync');

exports.validUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await UserModel.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!user) return next(new AppError('User not found', 404));

  req.user = user;
  next();
});
