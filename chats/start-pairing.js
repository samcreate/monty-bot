'use strict';
import Sessions from '../lib/sessions';
import db from '../models';
import cardGen from '../lib/utils/card-creator';
import buttonGen from '../lib/utils/button';

module.exports = (bot) => {

  //new
  bot.on('postback:START_PAIRING', (payload, chat) => {
    Sessions.instance.findOrCreate(payload.sender.id).then(({user, session}) => {
      console.log('postback:START_PAIRING ')
      bot.runAIRequest({
        message: {
          text: `pairing food`
        }
      }, session);
    });
  })


  bot.on('pairing-varietals', (payload, chat, data) => {
    Sessions.instance.findOrCreate(payload.sender.id).then(({user, session}) => {
      let wine_basic_type = data.parameters['wine-type'].toLowerCase();
      let _varietals;
      db.Varietals.findAll({
        where: {
          type: wine_basic_type,
        },
        include: [{model: db.VarietalsChats, as: 'Chats'}],
        limit: 3,
        order: [
          [db.sequelize.fn('RANDOM')], [ { model:db.VarietalsChats, as: 'Chats' }, 'order']
        ]
      })
        .then((varietals) => {
          console.log('varietalsvarietalsvarietalsvarietals', varietals)
          let holder_image = 'https://s3-us-west-1.amazonaws.com/monty-prod/92179bf9-e253-4ff2-b1a7-3fa56b5d969f.jpg'
          let cards = [];
          for (var i = 0; i < varietals.length; i++) {
            let varietal = varietals[i];
            let tmp_card;
            let tmp_buttons = [];
            console.log('here', varietal.get({plain:true}))
            tmp_buttons.push(buttonGen({
              type: 'postback',
              title: 'Learn More',
              payload: `VARIETAL_LEARNMORE_${varietal.id}`
            }))
            tmp_buttons.push(buttonGen({
              type: 'postback',
              title: `Shop ${varietal.name}s`,
              payload: `SHOPBY_VARIETAL_${varietal.id}`
            }))
            tmp_buttons.push(buttonGen({
              type: 'postback',
              title: 'Get more specific!',
              payload: `VARIETAL_SPECIFIC_${varietal.id}`
            }))

            // console.log(tmp_buttons)

            tmp_card = cardGen({
              title: varietal.name,
              hero: varietal.hero || holder_image,
              subtitle: varietal.Chats[0].chat,
              buttons: tmp_buttons
            });
            cards.push(tmp_card);
          }

          // console.log(cards);
          chat.sendGenericTemplate(cards, {
            typing: true
          }).then((res) => {
            // console.log('menu worked!')
          })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          console.log('err: ', err)
        })

      console.log('pairing-varietals', data.parameters['wine-type'].toLowerCase())
      console.log(db.sequelize.fn('random'))
    // bot.runAIRequest({message:{text:`pairing food`}},session);
    });
  });




  // OLD
  bot.on('postback:WINE_FOOD', (payload, chat) => {
    console.log('postback:WINE_FOOD')
    Sessions.instance.findOrCreate(payload.sender.id).then(({session, user}) => {
      //console.log('postback:WINE_PAIRINGS findOrCreateV2',sessionId,user.get('first_name'))
      bot.runAIRequest({
        message: {
          text: `wine for food`
        },
        sender: {
          id: chat.userId
        }
      }, session);
    });

  });
  bot.on('pair-winefood', (payload, chat, data) => {
    console.info('pair-winefood event captured!!!!', data);

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
    chat.sendGenericTemplate(elements, {
      typing: 3500
    }).catch((err) => {
      console.log('event triggered but error: ', err)
    });

    Sessions.instance.findOrCreate(payload.sender.id).then(({user, session}) => {
      db.PastConversation.create({
        context: data
      })
        .then((pastConvo) => {
          console.log('_saveConvoToDB: _temp_convo')
          user.addPastConvo(pastConvo);
        })
        .catch((err) => {
          console.log('_saveConvoToDB ERROR IN associations', err);
        });
    });
  })
}
