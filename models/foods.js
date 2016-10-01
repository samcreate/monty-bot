'use strict';
module.exports = function(sequelize, DataTypes) {
  var Foods = sequelize.define('Foods', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Foods.belongsToMany(models.BaseAttributes, {through: 'Attributes'});
      }
    }
  });
  return Foods;
};
