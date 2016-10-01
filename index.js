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
// bot.module(help);
bot.module(menu);

bot.setGreetingText(`Hello, My name’s Monty. I’m a bot (⧓) who also happens to be a wine expert.`);
bot.setGetStartedButton((payload, chat) => {
  Sessions.instance.findOrCreate(chat.userId).then(({session,user})=>{
    let context = {name: 'intro'}
    bot.runAIRequest({message:{text:'intro'},sender:{id:chat.userId}},session,context);
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


db.sequelize.sync()
  .then(() => {
    bot.start((process.env.PORT || 3000));
  })
  .catch((err) => {
    console.log("ERROR: ", err);
  })
