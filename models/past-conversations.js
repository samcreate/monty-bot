'use strict';
module.exports = function(sequelize, DataTypes) {
  var PastConversation = sequelize.define('PastConversation', {
    context: DataTypes.JSON,
    sent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        PastConversation.belongsTo(models.User);
      }
    }
  });
  return PastConversation;
};
