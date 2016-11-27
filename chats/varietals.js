'use strict';
import Sessions from '../lib/sessions';
import db from '../models';
import wineListGen from '../lib/utils/wine-list-gen'
module.exports = (bot) => {

  // for variteal learn more button
  bot.on('postback', (payload, chat) => {
    const re = /VARIETAL_LEARNMORE_(\d+)/i;
    const buttonPayload = payload.postback.payload;
    const match = buttonPayload.match(re);

    if (match) {
      const varitealId = match[1];
      // console.log('Here\'s my variteal id', varitealId)
      Sessions.instance.findOrCreate(payload.sender.id).then(({user, session}) => {
        console.log('postback:START_PAIRING ');
        db.Varietals.findOne({
          where: {
            id: varitealId
          }
        }).then(function(varietal) {
          console.log(varietal.name)
          bot.runAIRequest({
            message: {
              text: varietal.name
            }
          }, session);
        })

      });
    }
  });


  bot.on('get-winesbyvarietal', (payload, chat, data) => {

    let varietal_id = data.id;
    console.log('get-winesbyvarietal', varietal_id)
    Sessions.instance.findOrCreate(payload.sender.id).then(({user, session}) => {
      db.Wines.findAll({
        where: {
          varietal_id: varietal_id,
        },
        limit: 4,
        order: [
          [db.sequelize.fn('RANDOM')]
        ]
      })
        .then((wines) => {

          let elements = [];
          wines.forEach((wine) => {
            let hero = 'https://s3-us-west-1.amazonaws.com/monty-prod/'+wine.hero || 'https://s3-us-west-1.amazonaws.com/monty-prod/92179bf9-e253-4ff2-b1a7-3fa56b5d969f.jpg'
            wine = wineListGen({
              id: wine.id,
              title: wine.name,
              hero: hero,
              producer: wine.producer,
              url: wine.url,
              price: wine.price,
              vintage: wine.vintage
            });
            elements.push(wine);
          });
          // console.log(elements)
          chat.sendListTemplate(elements, {
            typing: true
          }).catch((err) => {
            console.log('err: ', err)
          })
        })

    });
  // {id, title, hero, producer, url, price}
  })

  // bot.on('get-varietals', (payload, chat, data) => {
  //   console.log('------------- -----------> > continue-tasteprofile: ', data.parameters.next)
  //   Sessions.instance.findOrCreate(payload.sender.id).then(({user, session}) => {
  //     let context = {
  //       name: `taste_profile${data.parameters.next}`
  //     }
  //     bot.runAIRequest({
  //       message: {
  //         text: `apigiveme${data.parameters.next}`
  //       },
  //       sender: {
  //         id: chat.userId
  //       }
  //     }, session, context, 1250);
  //   });
  // });

  bot.on('get-varietals', (payload, chat, data) => {
    let image_versions = [];

    image_versions['v1'] = [
      'https://s3-us-west-1.amazonaws.com/monty-prod/92179bf9-e253-4ff2-b1a7-3fa56b5d969f.jpg',
      'https://s3-us-west-1.amazonaws.com/monty-prod/97b0c11a-b649-4db2-82bf-7cf5e0826e39.jpg',
      'https://s3-us-west-1.amazonaws.com/monty-prod/482531e7-2ff4-4b23-a068-50275c508670.jpg'
    ];

    image_versions['v2'] = [
      'https://s3-us-west-1.amazonaws.com/monty-prod/ff8d7c83-8633-4451-9c36-c83a68d80793.jpg',
      'https://s3-us-west-1.amazonaws.com/monty-prod/7655a64c-a2fc-4161-aac1-248592b3075d.jpg',
      'https://s3-us-west-1.amazonaws.com/monty-prod/cc025097-c372-4d35-97a2-9533a7463ffa.jpg'
    ];

    let imgs = image_versions[(data.parameters.version.toLowerCase())]

    let elements = [
      {
        "title": "Barbera",
        "image_url": imgs[0],
        "subtitle": "Barbera is relatively acidic for a red, which makes it the ideal companion for many dishes, including those made with tomatoes. It's a fantastic bridge between New World and Old World reds, combining bright fruits with a balanced structure.",
        "buttons": [
          {
            "type": "postback",
            "title": "Learn More",
            "payload": "donothing"
          },
          {
            "type": "postback",
            "title": "Shop Barberas",
            "payload": "donothing"
          },
          {
            "type": "postback",
            "title": "Get more specific!",
            "payload": "donothing"
          }
        ]
      },
      {
        "title": "	Blaufrankisch",
        "image_url": imgs[1],
        "subtitle": "Barbera is relatively acidic for a red, which makes it the ideal companion for many dishes, including those made with tomatoes. It's a fantastic bridge between New World and Old World reds, combining bright fruits with a balanced structure.",
        "buttons": [
          {
            "type": "postback",
            "title": "Learn More",
            "payload": "donothing"
          },
          {
            "type": "postback",
            "title": "Shop Blaufrankischs",
            "payload": "donothing"
          },
          {
            "type": "postback",
            "title": "Get more specific!",
            "payload": "donothing"
          }
        ]
      },
      {
        "title": "Cabernet Sauvignon",
        "image_url": imgs[2],
        "subtitle": "Barbera is relatively acidic for a red, which makes it the ideal companion for many dishes, including those made with tomatoes. It's a fantastic bridge between New World and Old World reds, combining bright fruits with a balanced structure.",
        "buttons": [
          {
            "type": "postback",
            "title": "Learn More",
            "payload": "donothing"
          },
          {
            "type": "postback",
            "title": "Shop Cabernet Sauvignons",
            "payload": "donothing"
          },
          {
            "type": "postback",
            "title": "Get more specific!",
            "payload": "donothing"
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
