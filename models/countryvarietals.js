'use strict';
module.exports = function(sequelize, DataTypes) {
  var CountryVarietals = sequelize.define('CountryVarietals', {}, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return CountryVarietals;
};
