'use strict';
module.exports = function(sequelize, DataTypes) {
  var Conversation = sequelize.define('Conversation', {
    sessionId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    said: {
      type: DataTypes.JSON,
      allowNull: false
    },
    bot: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Conversation.belongsTo(models.User);
      }
    },
    indexes: [{
      fields: ['sessionId']
    }]
  });
  return Conversation;
};
