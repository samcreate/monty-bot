'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */


    // queryInterface.sequelize.query('ALTER TABLE Attributes ALTER COLUMN BaseAttributeId INTEGER NULL').then(()=>{
    //   return queryInterface.sequelize.query('ALTER TABLE Attributes ALTER COLUMN FoodId INTEGER NULL')
    // }).then(()=>{
    //   return queryInterface.sequelize.query('ALTER TABLE Attributes ALTER COLUMN WineId INTEGER NULL')
    // }).catch(err=>{
    //   console.log('error: ',err)
    // })

  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
