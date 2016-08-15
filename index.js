'use strict';
import Sessions from './lib/sessions';
const BootBot = require('./lib/BootBot');
const config = require('config');
const Chat = require('./lib/Chat');
//const Sessions = require('./lib/sessions');



let Wit = require('node-wit').Wit;
let log = require('node-wit').log;
// const echoModule = require('./modules/echo');

//const sessions = new Sessions();
const Actions = require('./lib/actions');

const actions = new Actions();

// console.log(Sessions.instance.findOrCreate(666))
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
//`Hello there! My name’s Monty. I’m a bot (⧓) who also happens to be a wine expert.`

actions.on('send-facebook-message', (data) => {
  console.log('an event occurred!',data);
  const chat = new Chat(bot, data.recipientId);
  // //new Chat(this, senderId)
  chat.say({
    text: data.text,
    quickReplies: data.quickreplies
  })
});
// bot.on('message', (payload, chat) => {
//
//   console.log('on:message called!');
//   const sender = payload.sender.id;
//   const sessionId = Sessions.instance.findOrCreate(sender);
//   console.log()
//   wit.runActions(
//     sessionId, // the user's current session
//     payload.message.text, // the user's message
//     Sessions.instance.store[sessionId].context // the user's current session state
//   ).then((context) => {
//     //update the users context
//     Sessions.instance.store[sessionId].context = context;
//   }).catch((err) => {
//     console.error('Oops! Got an error from Wit: ', err.stack || err);
//   })
// });
// bot.hear('fart')

// bot.module(echoModule);

// bot.setGreetingText('Hey there! Welcome to BootBot!');
bot.setGetStartedButton((payload, chat) => {
  chat.say({
    text: `Hello there! My name’s Monty. I’m a bot (⧓) who also happens to be a wine expert.`,
    quickReplies: ['Mexican', 'Italian', 'American', 'Argentine']
  })
  chat.say(`Hello there! My name’s Monty. I’m a bot (⧓) who also happens to be a wine expert.`);
});
// bot.setPersistentMenu([
//   {
//     type: 'postback',
//     title: 'Help',
//     payload: 'PERSISTENT_MENU_HELP'
//   },
//   {
//     type: 'postback',
//     title: 'Settings',
//     payload: 'PERSISTENT_MENU_SETTINGS'
//   },
//   {
//     type: 'web_url',
//     title: 'Go to Website',
//     url: 'http://yostik.io'
//   }
// ]);
//
// bot.on('postback:PERSISTENT_MENU_HELP', (payload, chat) => {
//   chat.say(`I'm here to help!`);
// });
//
// bot.on('postback:PERSISTENT_MENU_SETTINGS', (payload, chat) => {
//   chat.say(`Here are your settings: ...`);
// });
//
bot.start();
