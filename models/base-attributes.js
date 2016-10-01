'use strict';
module.exports = function(sequelize, DataTypes) {
  var BaseAttributes = sequelize.define('BaseAttributes', {
    name: DataTypes.STRING,
    type: {
      type: DataTypes.ENUM,
      values: ['flavor', 'aroma', 'wine-attr', 'other']
    },
    importance: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        BaseAttributes.hasMany(models.Attributes, { as: 'Attributes' });
      }
    }
  });
  return BaseAttributes;
};
