'use strict';
module.exports = function(sequelize, DataTypes) {
  var VarietalsMedia = sequelize.define('VarietalsMedia', {
    filename: DataTypes.STRING,
    type: {
      type: DataTypes.ENUM,
      values: ['image', 'video', 'audio', 'file']
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        VarietalsMedia.belongsTo(models.Varietals);
      }
    }
  });
  return VarietalsMedia;
};
