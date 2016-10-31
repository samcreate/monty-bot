if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize'),
    sequelize = null

  if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
    var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)

    sequelize = new Sequelize(match[5], match[1], match[2], {
      dialect: 'postgres',
      protocol: 'postgres',
      port: match[4],
      host: match[3],
      logging: true //false
    })
  } else {
    // the application is executed on the local machine ... use mysql
    //  sequelize = new Sequelize('postgres://postgres:root@localhost:5432/monty',{logging: false});
    sequelize = new Sequelize('postgres://xjxawixjxibfsp:leieCrlDuGXs1sFkqBQCCDoR9Y@ec2-50-17-206-164.compute-1.amazonaws.com:5432/deuoak0419t6qe', {native:true});

  }
  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User: sequelize.import(__dirname + '/user'),
    Conversation: sequelize.import(__dirname + '/conversation'),
    Session: sequelize.import(__dirname + '/session'),
    PastConversation: sequelize.import(__dirname + '/past-conversations'),
    Appellation: sequelize.import(__dirname + '/appellation'),
    CountryVarietals: sequelize.import(__dirname + '/country-varietals'),
    Countries: sequelize.import(__dirname + '/countries'),
    BaseAttributes: sequelize.import(__dirname + '/base-attributes'),
    Varietals: sequelize.import(__dirname + '/varietals'),
    VarietalsAttributes: sequelize.import(__dirname + '/varietals-attributes'),
    FoodAttributes: sequelize.import(__dirname + '/food-attributes'),
    FoodVarietals: sequelize.import(__dirname + '/food-varietals'),
    VarietalsMedia: sequelize.import(__dirname + '/varietals-media'),
    Wines: sequelize.import(__dirname + '/wines'),
    WinesMedia: sequelize.import(__dirname + '/wines-media'),
    WinesAttributes: sequelize.import(__dirname + '/wines-attributes'),
    Foods: sequelize.import(__dirname + '/foods'),
    GeneralMedia: sequelize.import(__dirname + '/general-media')
  }

  Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
      db[modelName].associate(db);
    }
  });
  //global.db.Conversation.belongsTo(global.db.User);
  //global.db.User.hasMany(global.db.Conversation,{as: 'Convo',  foreignKeyConstraint:true});

}

module.exports = global.db
