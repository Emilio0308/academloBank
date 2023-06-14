const { DataTypes } = require('sequelize');
const { db } = require('./../database/config');

const transferModel = db.define('transfers', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  senderUserId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  receiverUserId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
});

module.exports = transferModel;
