'use strict';
import Sessions from '../lib/sessions';
import db from '../models';
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
      bot.runAIRequest({message:{text:`taste profile`}},session);
    });
  });


  bot.on('update-taste-profile', (payload, chat, data) => {
    Sessions.instance.findOrCreate(payload.sender.id).then(({user,session})=>{
      db.TasteProfileNames.findOne({where:{name:data.parameters['taste-profile_val']}})
      .then((taste_record) =>{
        return db.UserProfile.create({TasteProfileNameId:taste_record.get('id'),UserUid: user.get('uid')})
      })
      .then(()=>{
        console.log('it worked!')
        if(data.parameters['taste-profile_finished']){
          console.log('save users profile as complete and trigger showing the menu')
          chat.trigger('show-menu');
          user.update({profile:true})
        }
      })
      .catch((err)=>{
        console.log('err', err)
      })
    });
  });

  bot.on('check-for-taste-profile', (payload, chat, data) => {
    Sessions.instance.findOrCreate(payload.sender.id).then(({user,session})=>{
      if(user.get('profile') === true){
        chat.say('Great, here are a few options to start off with.').then(()=>{
          chat.trigger('show-menu');
        })
      }else{
        chat.say({
            text: 'By the way, all the wines I introduce you have special stories behind them. When you know a wine\'s story, it\'s like making a friend. In a bottle.',
            quickReplies: ['I\'m in']
        });
      }
    });
  });





}
