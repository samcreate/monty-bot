'use strict';
module.exports = function(sequelize, DataTypes) {
  var Varietals = sequelize.define('Varietals', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    synonyms: {
      type: DataTypes.STRING
    },
    hero: DataTypes.STRING,
    type:{
      type: DataTypes.ENUM,
      values: ['white', 'red', 'sparkling', 'dessert']
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Varietals.belongsToMany(models.BaseAttributes, {
          through: 'VarietalsAttributes'
        });
        Varietals.belongsToMany(models.Countries, {
          through: 'CountryVarietals'
        });
        Varietals.belongsToMany(models.Foods, {
          through: 'FoodVarietals'
        });
        Varietals.hasMany(models.VarietalsMedia, {
          as: 'Media',
          onDelete: 'cascade',
          hooks: true
        });

        Varietals.hasMany(models.Wines, {
          foreignKey: 'varietal_id',
          as: 'Specifics',
          onDelete: 'cascade',
          hooks: true
        })
      }
    }
  });
  return Varietals;
};
