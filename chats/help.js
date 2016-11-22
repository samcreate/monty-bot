'use strict';
import Sessions from '../lib/sessions';
import _greeting from './_greeting'
import config from 'config';
module.exports = (bot) => {
  bot.hear(['help', 'sos','-h','--help','s.o.s.','menu', 'what else can I do?', 'what else can i do?', 'what else can I do','what are my options'],  (payload, chat) => {
    bot.on('postback:HELP_ME', (payload, chat) => {
      console.log('The Help Me button was clicked!');
    });
    chat.say({
      text: 'Favorite color?',
      buttons: [
          { type: 'postback', title: 'Red', payload: 'HELP_ME' },
          { type: 'postback', title: 'Blue', payload: 'HELP_ME' },
          { type: 'postback', title: 'Green', payload: 'HELP_ME' }
      ]
  });
  });

}
