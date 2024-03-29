'use strict';
module.exports = function(sequelize, DataTypes) {
  var Wines = sequelize.define('Wines', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    synonyms: {
      type: DataTypes.STRING
    },
    keywords: {
      type: DataTypes.STRING
    },
    hero: DataTypes.STRING,
    price: {
      type: DataTypes.DECIMAL,
      defaultValue:0.0
    },
    vintage: DataTypes.STRING,
    producer: DataTypes.STRING,
    hero: DataTypes.STRING,
    url: DataTypes.STRING,
    alcohol: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.0
    },
    type:{
      type: DataTypes.ENUM,
      values: ['white', 'red', 'sparkling', 'dessert']
    },
    favorite: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Wines.belongsToMany(models.BaseAttributes, {
          through: 'WinesAttributes'
        });
        Wines.belongsToMany(models.Countries, {
          through: 'WineCountries'
        });
        Wines.belongsToMany(models.Foods, {
          through: 'WineFoods'
        });
        Wines.belongsToMany(models.Appellation, {
          through: 'WineAppellations'
        });
        Wines.hasMany(models.WinesMedia, {
          as: 'Media',
          onDelete: 'cascade',
          hooks: true
        });
        Wines.belongsTo(models.Varietals, {
          as: 'Varietals',
          foreignKey: 'varietal_id'
        })
      }
    }
  });
  return Wines;
};
