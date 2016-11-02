'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    uid: {
      type: DataTypes.BIGINT(64),
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profile_pic: {
      type: DataTypes.STRING,
      allowNull: false
    },
    locale: {
      type: DataTypes.STRING,
      allowNull: false
    },
    timezone: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.Conversation, {
          as: 'Convo',
          onDelete: 'cascade',
          hooks: true
        });
        User.hasMany(models.PastConversation, {
          as: 'PastConvo',
          onDelete: 'cascade',
          hooks: true
        });
        User.hasOne(models.Session, {as: 'session',onDelete: 'cascade'})
        // User.hasOne(models.UserTasteProfile, {as: 'profile',onDelete: 'cascade'})
      }
    },
    indexes: [{
      fields: ['uid']
    }]
  });
  return User;
};
