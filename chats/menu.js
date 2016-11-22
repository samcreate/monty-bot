'use strict';
import Sessions from '../lib/sessions';
import _greeting from './_greeting'
module.exports = (bot) => {
  bot.on('show-menu', (payload, chat, data) => {
    let elements = [
      {
        "title": "Pairing",
        "image_url": "https://s3-us-west-1.amazonaws.com/monty-prod/0855dcda-e8f8-4759-ad2d-37a53da2df1e.png",
        "subtitle": "I'm planning a meal and I want the perfect wine to go with it.",
        "buttons": [
          {
            "type": "postback",
            "title": "Start pairing",
            "payload": "START_PAIRING"
          }
        ]
      },
      {
        "title": "Gifting",
        "image_url": "https://s3-us-west-1.amazonaws.com/monty-prod/b51f2c6c-1e21-4789-bef7-bb7f6cf7a806.png",
        "subtitle": "I need to get a special something for that special someone. ",
        "buttons": [
          {
            "type": "postback",
            "title": "Start gifting",
            "payload": "START_GIFTING"
          }
        ]
      },
      {
        "title": "Occasions",
        "image_url": "https://s3-us-west-1.amazonaws.com/monty-prod/23a605e3-9425-4683-8cb6-51f0e130f45a.png",
        "subtitle": "I want a wine for a special event or occasion.",
        "buttons": [
          {
            "type": "postback",
            "title": "Occasions",
            "payload": "START_OCCASIONS"
          }
        ]
      }
    ];
    chat.sendGenericTemplate(elements, {
      typing: true
    }).then((res) => {
      console.log('menu worked!')
    })
      .catch((err) => {
        console.log(err)
      })
  });
}
