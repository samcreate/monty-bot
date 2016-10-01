'use strict';
import Sessions from '../lib/sessions';
import db from '../models';


module.exports = (bot) => {
  bot.on('postback:WINE_FOOD', (payload, chat) => {
    console.log('postback:WINE_FOOD')
    Sessions.instance.findOrCreate(payload.sender.id).then(({session,user})=>{
      //console.log('postback:WINE_PAIRINGS findOrCreateV2',sessionId,user.get('first_name'))
      bot.runAIRequest({message:{text:`wine for food`}},session);
    });

  });
  bot.on('pair-winefood',(payload, chat, data) => {
    console.info('pair-winefood event captured!!!!',data);

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
    }).catch((err)=>{
      console.log('event triggered but error: ', err)
    });

    Sessions.instance.findOrCreate(payload.sender.id).then(({user,session})=>{
      db.PastConversation.create({context:data})
      .then((pastConvo)=>{
        console.log('_saveConvoToDB: _temp_convo')
        user.addPastConvo(pastConvo);
      })
      .catch((err)=>{
        console.log('_saveConvoToDB ERROR IN associations',err);
      });
    });
  })
}
