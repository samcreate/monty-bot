'use strict';
import Sessions from '../lib/sessions';

module.exports = (bot) => {

  bot.on('continue-tasteprofile', (payload, chat, data) => {
    console.log('------------- -----------> > continue-tasteprofile: ',data.parameters.next)
    Sessions.instance.findOrCreate(payload.sender.id).then(({user,session})=>{
      let context = {name: `taste_profile${data.parameters.next}`}
      bot.runAIRequest({message:{text:`apigiveme${data.parameters.next}`},sender:{id:chat.userId}},session,context,1250);
    });
  });

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
