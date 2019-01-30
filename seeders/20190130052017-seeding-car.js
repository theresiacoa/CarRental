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
   return queryInterface.bulkInsert('Cars', [{
    brand: 'Toyota All New Avanza',
    type: 'SUV',
    color: 'White',
    year: '2018',
    rentalPrice : 275000,
    createdAt: new Date(),
    updatedAt: new Date(),
   },
   {
    brand: 'Toyota Grand Innova',
    type: 'SUV',
    color: 'Silver',
    year: '2018',
    rentalPrice : 350000,
    createdAt: new Date(),
    updatedAt: new Date(),
   },
   {
    brand: 'Daihatsu All New Xenia',
    type: 'SUV',
    color: 'Silver',
    year: '2017',
    rentalPrice : 240000,
    createdAt: new Date(),
    updatedAt: new Date(),
   },
   {
    brand: 'Suzuki Ertiga',
    type: 'SUV',
    color: 'Black',
    year: '2016',
    rentalPrice : 230000,
    createdAt: new Date(),
    updatedAt: new Date(),
   },
   {
    brand: 'Honda Mobilio',
    type: 'City Car',
    color: 'White',
    year: '2017',
    rentalPrice : 240000,
    createdAt: new Date(),
    updatedAt: new Date(),
   }
   ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Cars', null, {});
  }
};
