const jwt = require('jsonwebtoken');

const generateJWT = (id) => {
  //debemos hacer la creacion del token algo asyncrono para esto usamos una promesa//
  return new Promise((res, rej) => {
    //necesitamos el payload en este caso sera el id del usuario//
    const payload = { id };
    //creamos la firma usando el payload, la clave secreta el tiempo de expiracion y un callback//
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      { expiresIn: process.env.JWT_EXPERI_IN },
      (err, token) => {
        err ? rej(err) : res(token);
      }
    );
  });
};

module.exports = generateJWT;
