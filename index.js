'use strict';
import Sessions from './lib/sessions';
import Actions from './lib/actions';
import BootBot from './lib/BootBot';
import config from 'config';
import Chat from './lib/Chat'
import {Wit, log} from 'node-wit';
import wineForParties from './chats/wine-for-parties';
import foodParing from './chats/food-pairing';

const actions = new Actions();
const wit = new Wit({
  accessToken: config.get('WIT_TOKEN'),
  actions,
  logger: new log.Logger(log.INFO)
});
const bot = new BootBot({
  wit,
  accessToken: config.get('FB_PAGE_TOKEN'),
  verifyToken: config.get('FB_VERIFY_TOKEN'),
  appSecret: config.get('FB_APP_SECRET')
});

bot.module(wineForParties);
bot.module(foodParing);

bot.setGreetingText(`Hello there! My name’s Monty. I’m a bot (⧓) who also happens to be a wine expert.`);
bot.setGetStartedButton((payload, chat) => {

  chat.say({
    text: `Hello there! My name’s Monty. I’m a bot (⧓) who also happens to be a wine expert. How can I be of service?`,
    buttons: [
      {
        type: 'postback',
        title: 'Wine For Parties',
        payload: 'WINE_PARTIES'
      },
      {
        type: 'postback',
        title: 'Wine Pairings',
        payload: 'WINE_PAIRINGS'
      },
      {
        type: 'postback',
        title: 'Vinesperation',
        payload: 'VINESPERATION'
      }

    ]
  },{typing: config.get('INDICATOR_TIME')});
});
bot.setPersistentMenu([
  {
    type: 'postback',
    title: 'Help',
    payload: 'PERSISTENT_MENU_HELP'
  },
  {
    type: 'postback',
    title: 'Settings',
    payload: 'PERSISTENT_MENU_SETTINGS'
  },
  {
    type: 'web_url',
    title: 'Go to Website',
    url: 'http://monty.wine'
  }
]);

actions.on('send-facebook-card', (data) => {
  const elements = [
    {
        title: 'Maquis Cabernet Sauvignon 2012',
        subtitle: 'Cabernet Sauvignon from Colchagua Valley, Rapel Valley, Chile',
        item_url: 'http://www.wine.com/v6/Maquis-Cabernet-Sauvignon-2012/wine/139748/Detail.aspx',
        image_url: 'http://cdn.fluidretail.net/customers/c1477/13/97/48/_s/pi/n/139748_spin_spin2/main_variation_na_view_01_204x400.jpg',
        buttons: [{
            type: 'web_url',
            url: 'http://www.wine.com/v6/Maquis-Cabernet-Sauvignon-2012/wine/139748/Detail.aspx',
            title: 'Buy for $12.50'
        }]
    },
    {
        title: 'Maquis Cabernet Sauvignon 2012',
        subtitle: 'Cabernet Sauvignon from Colchagua Valley, Rapel Valley, Chile',
        item_url: 'http://www.wine.com/v6/Maquis-Cabernet-Sauvignon-2012/wine/139748/Detail.aspx',
        image_url: 'http://cdn.fluidretail.net/customers/c1477/13/97/48/_s/pi/n/139748_spin_spin2/main_variation_na_view_01_204x400.jpg',
        buttons: [{
            type: 'web_url',
            url: 'http://www.wine.com/v6/Maquis-Cabernet-Sauvignon-2012/wine/139748/Detail.aspx',
            title: 'Buy for $12.50'
        }]
    }
  ];
  bot.sendGenericTemplate(data.recipientId, elements,{typing: config.get('INDICATOR_TIME')});

});
actions.on('send-facebook-message', (data) => {
  console.log('send-facebook-message!',data.text, data.quickreplies);
  const chat = new Chat(bot, data.recipientId);
  // //new Chat(this, senderId)

  if(data.quickreplies){
    chat.say({
      text: data.text,
      quickReplies: data.quickreplies,
      typing: config.get('INDICATOR_TIME')
    })
  }else{
    chat.say(data.text,{typing: config.get('INDICATOR_TIME')});
  }

});

// bot.setGreetingText('Hey there! Welcome to BootBot!');

bot.on('postback:FOOD_PAIRINGS', (payload, chat) => {
    console.log('The Help Me button was clicked!',payload);
});

//

//
// bot.on('postback:PERSISTENT_MENU_SETTINGS', (payload, chat) => {
//   chat.say(`Here are your settings: ...`);
// });
//
bot.start();
