'use strict';
import Sessions from './lib/sessions';
import BootBot from './lib/BootBot';
import config from 'config';
import Chat from './lib/Chat'
import wineForParties from './chats/wine-for-parties';
import wineForFood from './chats/wine-food';
import wineForOccasions from './chats/wine-occasion';
import menu from './chats/menu';
import help from './chats/help';
import intro from './chats/intro';
import taste_profile from './chats/taste-profile';
import db from './models';
import Apiai from 'apiai';
import _greeting from './chats/_greeting'



const apiai = Apiai(config.get('APIAI_CLIENT_TOKEN'), {language: 'en', requestSource: 'fb'});

const bot = new BootBot({
  apiai,
  accessToken: config.get('FB_PAGE_TOKEN'),
  verifyToken: config.get('FB_VERIFY_TOKEN'),
  appSecret: config.get('FB_APP_SECRET')
});

//Setup conversation modules
bot.module(wineForParties);
bot.module(wineForFood);
bot.module(wineForOccasions);
bot.module(menu);
bot.module(intro);
bot.module(taste_profile);

bot.setGreetingText(`Hello, My name’s Monty. I’m a bot (⧓) who also happens to be a wine expert.`);
//show-menu

bot.on('attachment',(payload, chat) => {
  let attachment = payload.message.attachments[0];
  if(attachment.hasOwnProperty('type') && attachment.type === 'location'){
    //console.log('location!!!', attachment.payload.coordinates)
    //console.log(payload.coordinates)
    //chat.say('Thanks, I love that area.')
  }
})
// console.log(event.message.attachments[0].payload.coordinates)
bot.setGetStartedButton((payload, chat) => {

  Sessions.instance.findOrCreate(chat.userId).then(({session,user})=>{
    let context = {name: `intro_1`}
    bot.runAIRequest({message:{text:'apigiveme1'},sender:{id:chat.userId}},session,context,1000);

  });

});
bot.setPersistentMenu([
  {
    type: 'postback',
    title: 'Help',
    payload: 'PERSISTENT_MENU_HELP'
  },
  {
    type: 'postback',
    title: 'I’m feeling lucky',
    payload: 'PERSISTENT_MENU_LUCKY'
  },
  {
    type: 'web_url',
    title: 'See the full Monty',
    url: 'http://monty.wine'
  }
]);

bot.start((process.env.PORT || 3000));
db.sequelize.sync()
  .then(() => {
    console.log('db syched')
  })
  .catch((err) => {
    console.log("ERROR: ", err);
  })
