const express = require('express');
const { transfer } = require('../controllers/transfer.controller');
const { tranfersValidation } = require('../middleware/transfers.validation');
const route = express.Router();

route.post('/',tranfersValidation ,transfer);

module.exports = route;
