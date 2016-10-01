'use strict';
import Sessions from './sessions';
import Dashbot from 'dashbot';
import config from 'config';

const Chat = require('./Chat');
const Conversation = require('./Conversation');
const EventEmitter = require('eventemitter3');
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fetch = require('node-fetch');
const normalizeString = require('./utils/normalize-string');
const dashbot = Dashbot(config.get('DASHBOT_API_KEY')).facebook;



class BootBot extends EventEmitter {
  constructor(options) {
    super();
    if (!options || (options && (!options.accessToken || !options.verifyToken || !options.appSecret))) {
      throw new Error('You need to specify an accessToken, verifyToken and appSecret');
    }

        this.test = {"employees":[
        {"firstName":"John", "lastName":"Doe"},
        {"firstName":"Anna", "lastName":"Smith"},
        {"firstName":"Peter", "lastName":"Jones"}
    ]};

    this.apiai = options.apiai;
    this.accessToken = options.accessToken;
    this.verifyToken = options.verifyToken;
    this.appSecret = options.appSecret;
    this.broadcastEchoes = options.broadcastEchoes || false;

    this.app = express();
    this.app.use(bodyParser.json({
      verify: this._verifyRequestSignature.bind(this)
    }));
    this._hearMap = [];
    this._conversations = [];
    this._initWebhook();
  }

  start(port) {
    this.app.set('port', port || 3000);
    this.server = this.app.listen(this.app.get('port'), () => {
      const portNum = this.app.get('port');
      console.log('BootBot running on port', portNum);
      console.log(`Facebook Webhook running on localhost:${portNum}/webhook`);
    });
  }

  close() {
    this.server.close();
  }

  sendTextMessage(recipientId, text, quickReplies, options) {
    const message = {
      text
    };
    const formattedQuickReplies = this._formatQuickReplies(quickReplies);
    if (formattedQuickReplies && formattedQuickReplies.length > 0) {
      message.quick_replies = formattedQuickReplies;
    }
    return this.sendMessage(recipientId, message, options);
  }

  sendButtonTemplate(recipientId, text, buttons, options) {
    const payload = {
      template_type: 'button',
      text
    };
    const formattedButtons = this._formatButtons(buttons);
    payload.buttons = formattedButtons;
    return this.sendTemplate(recipientId, payload, options);
  }

  sendGenericTemplate(recipientId, elements, options) {
    const payload = {
      template_type: 'generic',
      elements
    };
    return this.sendTemplate(recipientId, payload, options);
  }

  sendTemplate(recipientId, payload, options) {
    const message = {
      attachment: {
        type: 'template',
        payload
      }
    };
    return this.sendMessage(recipientId, message, options);
  }

  sendAttachment(recipientId, type, url, quickReplies, options) {
    const message = {
      attachment: {
        type,
        payload: {
          url
        }
      }
    };
    const formattedQuickReplies = this._formatQuickReplies(quickReplies);
    if (formattedQuickReplies && formattedQuickReplies.length > 0) {
      message.quick_replies = formattedQuickReplies;
    }
    return this.sendMessage(recipientId, message, options);
  }

  sendAction(recipientId, action, options) {
    return this.sendRequest({
      recipient: {
        id: recipientId
      },
      sender_action: action
    });
  }

  sendMessage(recipientId, message, options) {
    const onDelivery = options && options.onDelivery;
    const onRead = options && options.onRead;
    const req = () => (
    this.sendRequest({
      recipient: {
        id: recipientId
      },
      message
    }).then((json) => {

      const requestData = {
        url: `https://graph.facebook.com/v2.6/me/messages?access_token=${this.accessToken}`,
        qs: {access_token: this.accessToken},
        method: 'POST',
        json: {
          recipient: {id: recipientId},
          message
        }
      };

      dashbot.logOutgoing(requestData, json);
      if (typeof onDelivery === 'function') {
        this.once('delivery', onDelivery);
      }
      if (typeof onRead === 'function') {
        this.once('read', onRead);
      }
      return json;
    })
    );
    if (options && options.typing) {
      const autoTimeout = (message && message.text) ? message.text.length * 20 : 1000;
      const timeout = (typeof options.typing === 'number') ? options.typing : autoTimeout;
      return this.sendTypingIndicator(recipientId, timeout).then(req);
    }
    return req();
  }

  sendRequest(body, endpoint, method) {

    endpoint = endpoint || 'messages';
    method = method || 'POST';
    return fetch(`https://graph.facebook.com/v2.6/me/${endpoint}?access_token=${this.accessToken}`, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .catch(err => console.log(`Error sending message: ${err}`));
  }

  sendThreadRequest(body, method) {
    return this.sendRequest(body, 'thread_settings', method);
  }

  sendTypingIndicator(recipientId, milliseconds) {
    const timeout = isNaN(milliseconds) ? 0 : milliseconds;
    if (milliseconds > 20000) {
      milliseconds = 20000;
      console.error('sendTypingIndicator: max milliseconds value is 20000 (20 seconds)');
    }
    return new Promise((resolve, reject) => {
      return this.sendAction(recipientId, 'typing_on').then(() => {
        setTimeout(() => this.sendAction(recipientId, 'typing_off').then((json) => resolve(json)), timeout);
      });
    });
  }

  getUserProfile(userId) {
    const url = `https://graph.facebook.com/v2.6/${userId}?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=${this.accessToken}`;
    return fetch(url)
      .then(res => res.json())
      .catch(err => console.log(`Error getting user profile: ${err}`));
  }

  setGreetingText(text) {
    return this.sendThreadRequest({
      setting_type: 'greeting',
      greeting: {
        text
      }
    });
  }

  setGetStartedButton(action) {
    const payload = (typeof action === 'string') ? action : 'BOOTBOT_GET_STARTED';
    if (typeof action === 'function') {
      this.on(`postback:${payload}`, action);
    }
    return this.sendThreadRequest({
      setting_type: 'call_to_actions',
      thread_state: 'new_thread',
      call_to_actions: [{
        payload
      }]
    });
  }

  deleteGetStartedButton() {
    return this.sendThreadRequest({
      setting_type: 'call_to_actions',
      thread_state: 'new_thread'
    }, 'DELETE');
  }

  setPersistentMenu(buttons) {
    const formattedButtons = this._formatButtons(buttons);
    return this.sendThreadRequest({
      setting_type: 'call_to_actions',
      thread_state: 'existing_thread',
      call_to_actions: formattedButtons
    });
  }

  deletePersistentMenu() {
    return this.sendThreadRequest({
      setting_type: 'call_to_actions',
      thread_state: 'existing_thread'
    }, 'DELETE');
  }

  say(recipientId, message, options) {

    if (typeof message === 'string') {
      return this.sendTextMessage(recipientId, message, [], options);
    } else if (message && message.text) {
      if (message.quickReplies && message.quickReplies.length > 0) {
        return this.sendTextMessage(recipientId, message.text, message.quickReplies, options);
      } else if (message.buttons && message.buttons.length > 0) {
        return this.sendButtonTemplate(recipientId, message.text, message.buttons, options);
      }
    } else if (message && message.attachment) {
      return this.sendAttachment(recipientId, message.attachment, message.url, message.quickReplies, options);
    }
    console.error('Invalid format for .say() message.');
  }

  hear(keywords, callback) {
    keywords = Array.isArray(keywords) ? keywords : [keywords];
    keywords.forEach(keyword => this._hearMap.push({
      keyword,
      callback
    }));
    return this;
  }

  module(factory) {
    return factory.apply(this, [this]);
  }

  conversation(recipientId, factory) {
    if (!recipientId || !factory || typeof factory !== 'function') {
      return console.error(`You need to specify a recipient and a callback to start a conversation`);
    }
    const convo = new Conversation(this, recipientId);
    this._conversations.push(convo);
    convo.on('end', (endedConvo) => {
      const removeIndex = this._conversations.indexOf(endedConvo);
      this._conversations.splice(removeIndex, 1);
    });
    factory.apply(this, [convo]);
    return convo;
  }




  runAIRequest(event = {}, session, context) {
    console.log('here')
    console.log('runAIRequest: Im here', session.get('id'), ", message: ",event.message.text, 'context: ',context);
    //apiai
    let fbid = session.get('UserUid');
    let default_response = (id, message = '')=>{
      //console.log('FUCKKKKKKKKK',id,message)
      this.say(id, 'Well excuse me please, I\'ve seem to run into an issue. Too much wine? :) Ask again!', {
        typing: true
      });
    };

    if(context){
      session.get('store').context.push(context);
      //console.log('runAIRequest: Im here2',   session.get('store').context);
    }
    //console.log(Sessions.instance.store[sessionId].contexts)
    let request = this.apiai.textRequest(event.message.text, {
      sessionId: session.get('id'),
      contexts: session.get('store').context
    }).on('response', (response) => {
      //check for my ghetto quickReplies template in speech body
      this._ifItHasQuickReplies(response.result.fulfillment.speech).then(({text, quickreplies}) => {
        //respond to user
        this.say(session.get('UserUid'), {
          text: text,
          quickReplies: quickreplies
        }, {
          typing: true
        }).then(()=>{
          return this._saveConvoToDB(session.get('UserUid'), response, true);
        })

      }).catch((text) => {
        if(!text){
          return default_response(session.get('UserUid'), 'no text');
        }
        this.say(session.get('UserUid'), text, {
          typing: true
        }).then(()=>{
          return this._saveConvoToDB(session.get('UserUid'), response, true);
        });
        if (response.result.actionIncomplete === false) {
          //end of conversation, we have all the parameters we need, let's fire our action.

          let data = response.result.contexts.filter((context) => {
            if (context.name === 'generic') {
              context.name = response.result.action;
              return context;
            }
          })
          //console.log('response.result.action: ',response.result.action,event, data[0])
          this._handleEvent(response.result.action, event, data[0]);
        }
      });

    }).on('error', (error) => {
      console.error(error);
      return default_response(session.get('UserUid'), 'api.ai error '+ error);
    }).end();
  }

  _saveConvoToDB(fbid, said, bot=false){
    console.log('_saveConvoToDB: called. Fbid:',fbid)
    Sessions.instance.findOrCreate(fbid).then(({user,session})=>{
      db.Conversation.create({sessionId:(session.get('id')), said, bot})
      .then((convo)=>{
        console.log('_saveConvoToDB: _temp_convo')
        user.addConvo(convo);
      })
      .catch((err)=>{
        console.log('_saveConvoToDB ERROR IN associations',err);
      });
    });

  }


  _ifItHasQuickReplies(speech) {
    console.log('_ifItHasQuickReplies speech: ',speech);
    return new Promise((resolve, reject) => {
      let quickreplies = speech.split('*')

      if (quickreplies[1]) {
        let tmp_speech = {
          text: quickreplies[0]
        };
        quickreplies = quickreplies[1].replace(/'/g, '"');
        quickreplies = JSON.parse(quickreplies);
        tmp_speech.quickreplies = quickreplies;
        resolve(tmp_speech);
      } else {
        reject(speech)
      }
    });
  }

  _formatButtons(buttons) {
    return buttons && buttons.map((button) => {
        if (typeof button === 'string') {
          return {
            type: 'postback',
            title: button,
            payload: 'BOOTBOT_BUTTON_' + normalizeString(button)
          };
        } else if (button && button.title) {
          return button;
        }
        return {};
      });
  }

  _formatQuickReplies(quickReplies) {
    return quickReplies && quickReplies.map((reply) => {
        if (typeof reply === 'string') {
          return {
            content_type: 'text',
            title: reply,
            payload: 'BOOTBOT_QR_' + normalizeString(reply)
          };
        } else if (reply && reply.title) {
          return {
            content_type: reply.content_type || 'text',
            title: reply.title,
            payload: reply.payload || 'BOOTBOT_QR_' + normalizeString(reply.title)
          };
        }
        return {};
      });
  }

  _handleEvent(type, event, data) {
    //console.log('_handleEvent', type, event, data)
    const chat = new Chat(this, event.sender.id);
    this.emit(type, event, chat, data);
  }

  _handleMessageEvent(event, session) {

    if (this._handleConversationResponse('message', event)) {
      return;
    }
    const text = event.message.text;
    const senderId = event.sender.id;
    let captured = false;
    if (!text) {
      return;
    }
    this._hearMap.forEach(hear => {
      if (typeof hear.keyword === 'string' && hear.keyword.toLowerCase() === text.toLowerCase()) {
        captured = true;
        return hear.callback.apply(this, [event, new Chat(this, session.get('UserUid')), {
          keyword: hear.keyword
        }]);
      } else if (hear.keyword instanceof RegExp && hear.keyword.test(text)) {
        captured = true;
        return hear.callback.apply(this, [event, new Chat(this, session.get('UserUid')), {
          keyword: hear.keyword,
          match: text.match(hear.keyword)
        }]);
      } else {
        //console.log('NOTHING TO DO FROM BOOT BOT');
      }
    });

    this._handleEvent('message', event, {
      captured
    });
    if (captured === false) {
      this.runAIRequest(event, session);
    }
  }

  _handleAttachmentEvent(event) {
    if (this._handleConversationResponse('attachment', event)) {
      return;
    }
    this._handleEvent('attachment', event);
  }

  _handlePostbackEvent(event) {
    if (this._handleConversationResponse('postback', event)) {
      return;
    }
    const payload = event.postback.payload;
    if (payload) {
      this._handleEvent(`postback:${payload}`, event);
    }
    this._handleEvent('postback', event);
  }

  _handleQuickReplyEvent(event) {
    if (this._handleConversationResponse('quick_reply', event)) {
      return;
    }
    const payload = event.message.quick_reply && event.message.quick_reply.payload;
    if (payload) {
      this._handleEvent(`quick_reply:${payload}`, event);
    }
    this._handleEvent('quick_reply', event);
  }

  _handleConversationResponse(type, event) {
    const userId = event.sender.id;
    let captured = false;
    this._conversations.forEach(convo => {
      if (userId && userId === convo.userId && convo.isActive()) {
        captured = true;
        return convo.respond(event, {
          type
        });
      }
    });
    return captured;
  }

  _initWebhook() {
    this.app.get('/sessions', (req, res) => {
      Sessions.instance.getActiveSessions(true).then((sessions)=>{
        res.json(sessions);
      });

    });
    this.app.get('/webhook', (req, res) => {
      if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === this.verifyToken) {
        console.log('Validation Succeded.')
        res.status(200).send(req.query['hub.challenge']);
      } else {
        console.error('Failed validation. Make sure the validation tokens match.');
        res.sendStatus(403);
      }
    });

    this.app.post('/webhook', (req, res) => {

      var data = req.body;
          dashbot.logIncoming(data);

      if (data.object !== 'page') {
        return;
      }
      // Iterate over each entry. There may be multiple if batched.
      data.entry.forEach((entry) => {
        // Iterate over each messaging event
        entry.messaging.forEach((event) => {
          if (event.message && event.message.is_echo && !this.broadcastEchoes) {
            return;
          }
          if (event.optin) {
            this._handleEvent('authentication', event);
          } else if (event.message && event.message.text) {

            const sender = event.sender.id;
            // We retrieve the user's current session, or create one if it doesn't exist
            // This is needed for our bot to figure out the conversation history

            Sessions.instance.findOrCreate(sender).then(({user,session})=>{
              console.log('@@begining!!!!! ',user.get('first_name'),session.get('id'))
              this._saveConvoToDB(sender, event);
              this._handleMessageEvent(event, session);
              if (event.message.quick_reply) {
                this._handleQuickReplyEvent(event);
              }
            });
          } else if (event.message && event.message.attachments) {
            this._handleAttachmentEvent(event);
          } else if (event.postback) {

            this._handlePostbackEvent(event);
          } else if (event.delivery) {
            this._handleEvent('delivery', event);
          } else if (event.read) {
            this._handleEvent('read', event);
          } else if (event.account_linking) {
            this._handleEvent('account_linking', event);
          } else {
            console.log('Webhook received unknown event: ', event);
          }
        });
      });

      // Must send back a 200 within 20 seconds or the request will time out.
      res.sendStatus(200);
    });
  }

  _verifyRequestSignature(req, res, buf) {
    var signature = req.headers['x-hub-signature'];
    if (!signature) {
      throw new Error('Couldn\'t validate the request signature.');
    } else {
      var elements = signature.split('=');
      var method = elements[0];
      var signatureHash = elements[1];
      var expectedHash = crypto.createHmac('sha1', this.appSecret)
        .update(buf)
        .digest('hex');

      if (signatureHash != expectedHash) {
        throw new Error("Couldn't validate the request signature.");
      }
    }
  }
}

module.exports = BootBot;
