'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    UserId: DataTypes.INTEGER,
    CarId: DataTypes.INTEGER,
    rentalDate: DataTypes.STRING,
    totalPrice: DataTypes.INTEGER,
    status: DataTypes.STRING,
    address: DataTypes.STRING
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};