'use strict';
module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define('Car', {
    brand: DataTypes.STRING,
    type: DataTypes.STRING,
    color: DataTypes.STRING,
    year: DataTypes.STRING,
    rentalPrice: DataTypes.INTEGER
  }, {});
  Car.associate = function(models) {
    Car.belongsToMany(models.User, {through: 'Transaction'})
  };
  return Car;
};