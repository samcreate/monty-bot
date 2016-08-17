'use strict';
import Sessions from '../lib/sessions';

module.exports = (bot) => {
  bot.on('postback:WINE_PAIRINGS', (payload, chat) => {
    const sessionId = Sessions.instance.findOrCreate(chat.userId);
    bot.runWitActions({message:{text:`What goes well with wine?`}},sessionId);
  });
}
