module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
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
    indexes: [{
      unique: true,
      fields: ['uid']
    }]
  });
}

// User.sync().then(function () {
//
// });
//
// User profile:
// {
//   "first_name": "Peter",
//   "last_name": "Chang",
//   "profile_pic": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpf1/v/t1.0-1/p200x200/13055603_10105219398495383_8237637584159975445_n.jpg?oh=1d241d4b6d4dac50eaf9bb73288ea192&oe=57AF5C03&__gda__=1470213755_ab17c8c8e3a0a447fed3f272fa2179ce",
//   "locale": "en_US",
//   "timezone": -7,
//   "gender": "male"
// }
