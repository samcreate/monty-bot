'use strict';
import Sessions from '../lib/sessions';

module.exports = (bot) => {
  bot.on('continue-intro', (payload, chat, data) => {
    console.log('------------- -----------> > continue-intro: ',data.parameters.next)
    Sessions.instance.findOrCreate(payload.sender.id).then(({user,session})=>{
      let context = {name: `intro_${data.parameters.next}`}
      console.log('continue-intro callled',context)

      bot.runAIRequest({message:{text:`apigiveme${data.parameters.next}`},sender:{id:chat.userId}},session,context,1250);
    });
  });
}
