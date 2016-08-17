'use strict';
import Sessions from '../lib/sessions';

module.exports = (bot) => {
  bot.on('postback:WINE_PARTIES', (payload, chat) => {
    const sessionId = Sessions.instance.findOrCreate(chat.userId);
    bot.runWitActions({message:{text:`I'm looking for wine for a party`}},sessionId);
  });
}
