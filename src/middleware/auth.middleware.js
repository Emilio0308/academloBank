const UserModel = require('../model/user.model');
const AppError = require('../utils/app.Error');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  //recibir el token y obtenerlo//
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  //devolver error si no existe el token//
  if (!token) return next(new AppError('Your not logged', 401));
  //decodificar el token//
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );
  //verificar si el usuario del token, si existe sera el usuario en sesion//
  const user = await UserModel.findOne({
    where: {
      id: decoded.id,
      status: 'active',
    },
  });

  if (!user) return new AppError('the owner of this token is not aviable', 401);

  //guardar en la req como usuario en sesion//
  req.sessionUser = user;

  next();
});

exports.protectAccountOwner = catchAsync(async (req, res, next) => {
  const { user, sessionUser } = req;

  if (user.id !== sessionUser.id) {
    return next(new AppError('You are not the owner of this account', 401));
  }

  next();
});
