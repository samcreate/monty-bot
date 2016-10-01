'use strict';
import Sessions from '../lib/sessions';
import _greeting from './_greeting'
module.exports = (bot) => {
  bot.on('show-menu',(payload, chat, data) => {
    chat.say({text: data.parameters.copy,
      buttons: [
        {
          type: 'postback',
          title: 'Pair wine with food',
          payload: 'WINE_FOOD'
        },
        {
          type: 'postback',
          title: 'Find wine for an occasion',
          payload: 'WINE_OCCASIONS'
        },
        {
          type: 'postback',
          title: 'Educate my palate',
          payload: 'TASE_PROFILE'
        }
      ]
    }, {
      typing: 2500
    });
  });
}
