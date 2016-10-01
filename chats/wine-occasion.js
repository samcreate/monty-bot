'use strict';
import Sessions from '../lib/sessions';

module.exports = (bot) => {
  bot.on('postback:WINE_OCCASIONS', (payload, chat) => {
    console.log('WINE_OCCASIONS called:!!!');
    Sessions.instance.findOrCreate(payload.sender.id).then(({session,user})=>{
      console.log('postback:WINE_PAIRINGS findOrCreateV2',user.get('first_name'))
      let context = {name: 'wine-occasion'}
      bot.runAIRequest({message:{text:`occasion`}},session);
    });
  });
}
