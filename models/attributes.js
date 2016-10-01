'use strict';
module.exports = function(sequelize, DataTypes) {
  var Attributes = sequelize.define('Attributes', {
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here

      }
    }
  });
  return Attributes;
};
