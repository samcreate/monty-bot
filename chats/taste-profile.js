'use strict';
import Sessions from '../lib/sessions';

module.exports = (bot) => {
  bot.on('postback:TASE_PROFILE', (payload, chat) => {
    Sessions.instance.findOrCreate(payload.sender.id).then(({user,session})=>{
      console.log('postback:TASE_PROFILE ')
      // chat.say({
      //   text: `Great ${user.get('first_name')}, we're going to go through a series of questions that's going to help me calculate the best wines for you.`
      // },{ typing: true })
      bot.runAIRequest({message:{text:`taste profile`}},session);
    });
  });
}
