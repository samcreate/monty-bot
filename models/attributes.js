'use strict';
module.exports = function(sequelize, DataTypes) {
  var Attributes = sequelize.define('Attributes', {
    FoodId:{
      allowNull: true,
      type: DataTypes.INTEGER
    },
  	BaseAttributeId:{
      allowNull: true,
      type: DataTypes.INTEGER
    },
  	WineId:{
      allowNull: true,
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here

      }
    }
  });
  return Attributes;
};
