'use strict';
module.exports = function(sequelize, DataTypes) {
  var WinesMedia = sequelize.define('WinesMedia', {
    filename: DataTypes.STRING,
    type: {
      type: DataTypes.ENUM,
      values: ['image', 'video', 'audio', 'file']
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        WinesMedia.belongsTo(models.Wines);
      }
    }
  });
  return WinesMedia;
};
