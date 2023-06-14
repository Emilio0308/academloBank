const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/users.route');
const tranfersRoute = require('./routes/transfer.route');
const AppError = require('./utils/app.Error');
const globalErrorHandler = require('./controllers/error.controller');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/v1/users', userRoute);
app.use('/api/v1/transfers', tranfersRoute);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Cant find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
