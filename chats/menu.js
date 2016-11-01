'use strict';
import Sessions from '../lib/sessions';
import _greeting from './_greeting'
module.exports = (bot) => {
  bot.on('show-menu',(payload, chat, data) => {
    chat.say({text: data.parameters.copy,
      buttons: [
        {
          type: 'postback',
          title: 'Pairing',
          payload: 'WINE_FOOD'
        },
        {
          type: 'postback',
          title: 'Gifting',
          payload: 'WINE_OCCASIONS'
        },
        {
          type: 'postback',
          title: 'Occasions',
          payload: 'TASE_PROFILE'
        }
      ]
    }, {
      typing: 2500
    });
  });
}
