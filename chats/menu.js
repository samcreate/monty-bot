'use strict';
import Sessions from '../lib/sessions';
import _greeting from './_greeting'
module.exports = (bot) => {
  bot.on('show-menu', (payload, chat, data) => {
    let elements = [
      {
        "title": "Pairing",
        "image_url": "https://s3-us-west-1.amazonaws.com/monty-prod/9726f0d5-08ed-4ffb-962e-f73375a0ec0b.png",
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
        "image_url": "https://s3-us-west-1.amazonaws.com/monty-prod/1882704c-b01a-4ee8-9667-9302557ba976.png",
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
        "image_url": "https://s3-us-west-1.amazonaws.com/monty-prod/286b30e9-d7d2-4479-8e62-62da864f3e39.png",
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
