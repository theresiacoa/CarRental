'use strict';
const hash = require('../helpers/bcrypt');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: `Email format is incorrect`
        },
        isUnique: function (value, next) {
          User.findOne({
            where: {
              email: value,
              id: { [Op.ne]: this.id }
            }
          })
            .then(data => {
              if (data) {
                next(`email already in use`)
              } else {
                next()
              }
            })
            .catch(err => {
              next(err)
            })
        }
      }
    },
    status: DataTypes.STRING
  }, {
      hooks: {
        beforeCreate: (user) => {
          return new Promise((resolve, reject) => {
            hash(user.dataValues.password)
              .then((data) => {
                user.dataValues.password = data;
                resolve()
              })
              .catch((err) => {
                reject(err);
              })
          })
        },
        beforeBulkCreate: (users) => {
          return new Promise((resolve, reject) => {
            return users.forEach(function (user) {
              hash(user.dataValues.password)
              .then((data) => {
                user.dataValues.password = data;
                resolve()
              })
              .catch((err) => {
                reject(err);
              })
            })
          })
        }
      }
    });
  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.Car, { through: 'Transaction' })
  };

  User.prototype.getFullName = function () {
    return this.firstName + ' ' + this.lastName
  }
  return User;
};