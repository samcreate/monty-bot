'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */  queryInterface.addColumn({
        tableName: 'Wines',
        schema: 'public'
      },
        'synonyms',
        {
          type: Sequelize.STRING
        }
      )
    },

    down: function(queryInterface, Sequelize) {
      /*
        Add reverting commands here.
        Return a promise to correctly handle asynchronicity.

        Example:
        return queryInterface.dropTable('users');
      */
      queryInterface.removeColumn({
        tableName: 'Wines',
        schema: 'public'
      }, 'synonyms');
  }
};
