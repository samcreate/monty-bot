'use strict';
import Sessions from '../lib/sessions';
import _greeting from './_greeting'
import config from 'config';
module.exports = (bot) => {
  bot.hear(['help', 'sos','-h','--help','s.o.s.','menu', 'what else can I do?', 'what else can i do?', 'what else can I do','what are my options'],  (payload, chat) => {
    console.log('FUCK I"M HERE')
    chat.say(_greeting, {
      typing: true
    });
  });
}
