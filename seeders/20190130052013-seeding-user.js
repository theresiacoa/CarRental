'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Users', [{
    firstName: 'Arya',
    lastName: 'Wiguna',
    password: 'arya123',
    email: 'arya@mail.com',
    status: null,
    createdAt: new Date(),
    updatedAt: new Date(),
   },
   {
    firstName: 'Bambang',
    lastName: 'Sutatik',
    password: 'sutet251',
    email: 'bambang@mail.com',
    status: null,
    createdAt: new Date(),
    updatedAt: new Date(),
   },
   {
    firstName: 'Didi',
    lastName: 'Kempot',
    password: 'didi0812',
    email: 'didi@mail.com',
    status: null,
    createdAt: new Date(),
    updatedAt: new Date(),
   },
   {
    firstName: 'Rachmad',
    lastName: 'Alberto',
    password: 'rachmad123',
    email: 'rachmad@mail.com',
    status: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
   },
   {
    firstName: 'Theresia',
    lastName: 'Coanata',
    password: 'there123',
    email: 'there@mail.com',
    status: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
   },
   ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Users', null, {});
  }
};
