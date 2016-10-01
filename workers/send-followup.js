'use strict';

import db from '../models';
import Sessions from '../lib/sessions';
import moment from 'moment';
import config from 'config';
import Apiai from 'apiai';
import BootBot from '../lib/BootBot';

const apiai = Apiai(config.get('APIAI_CLIENT_TOKEN'), {
  language: 'en',
  requestSource: 'fb'
});

const bot = new BootBot({
  apiai,
  accessToken: config.get('FB_PAGE_TOKEN'),
  verifyToken: config.get('FB_VERIFY_TOKEN'),
  appSecret: config.get('FB_APP_SECRET')
});



function sendMessage(pastConvo) {
  return new Promise((resolve, reject) => {
    console.log('here')
  Sessions.instance.findOrCreate(pastConvo.get('UserUid'), true).then(({session, user}) => {
    console.log('send Message: ', pastConvo.get('context').name, session.get('id'))
    bot.runAIRequest({
      message: {
        text: pastConvo.get('context').name
      }
    }, session, pastConvo.get('context'));
  });
  resolve(pastConvo);
  });
}


function close(){

  bot.close();
  db.close();
  process.exit();
}


db.sequelize.sync()
  .then(() => {
    bot.start((process.env.PORT || 3002));
    db.PastConversation.findAll({
      where: {
        sent: false
      }
    }).then((pastConvos) => {
      pastConvos.forEach(convo => {
        let startTime = moment(convo.get('createdAt'));
        let endTime = moment(new Date().toISOString());
        let duration = moment.duration(endTime.diff(startTime));
        let time_alive_hours = duration.asHours();
        console.log(convo.get('createdAt'), config.get('FOLLOUP_TIME_HOURS'), time_alive_hours)
        console.log('pastConvos: ',convo.get('createdAt'), config.get('FOLLOUP_TIME_HOURS'), time_alive_hours)
        if (time_alive_hours > config.get('FOLLOUP_TIME_HOURS')) {
          sendMessage(convo).then((pastConvo) =>{
            pastConvo.update({ sent: true}, {fields: ['sent']});
          });
        }
      });
      close();
    }).catch(err => {
    });
  })
  .catch((err) => {
    console.log("ERROR: ", err);
  })

process.on('SIGINT', () => {
  log.notice({
    type: 'server',
    event: 'shutdown'
  });
  log.once('buffer drain', () => {
    log.closeConnection();
    log.on('disconnected', () => {
      close();
    });
  });
});
