'use strict';
module.exports = function(sequelize, DataTypes) {
  var Varietals = sequelize.define('Varietals', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    synonyms:{
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Varietals.belongsToMany(models.BaseAttributes, {through: 'Attributes'});
        Varietals.belongsToMany(models.Countries, {through: 'CountryVarietals'});
      }
    }
  });
  return Varietals;
};
