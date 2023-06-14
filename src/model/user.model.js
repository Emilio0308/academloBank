const { DataTypes } = require('sequelize');
const { db } = require('./../database/config');

const UserModel = db.define('users', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  accountNumber: {
    allowNull: false,
    unique: true,
    type: DataTypes.INTEGER,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  status: {
    allowNull: false,
    type: DataTypes.ENUM('active', 'disable'),
    defaultValue: 'active',
  },
});

module.exports = UserModel