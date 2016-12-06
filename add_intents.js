'use strict';

import config from 'config';
import db from './models';
import itentGen from './lib/utils/intent-gen'
import fs from 'fs'
import readline from 'readline'
import google from 'googleapis'
import googleAuth from 'google-auth-library'
import request from'request'
import sleep from'sleep'

const api_endpoint = 'https://api.api.ai/v1/intents'

let tryagain = [];

function handleChats(varietal, chats, varietals){
  if(chats.length<1) {
    console.log('handle next varietals')
    // sleep.sleep(0.5)
    handleVaritals(varietals)
  }else{
    let chat_to_send = chats.pop();
    let plain_varital = varietal.get({plain:true});
    plain_varital.chat = chat_to_send.get({plain:true})
    // varietal = itentGen();
    plain_varital = itentGen(plain_varital);
    request.post({
      headers: {
        'Authorization': `Bearer 12242d9207544c9a8d265cc46c4e7c4e`,
        'Content-Type': 'application/json; charset=utf-8',
      },
      url: api_endpoint,
      body: JSON.stringify(plain_varital)
      }, function(error, response, body) {
        body  = JSON.parse(body)
        if(body.status.errorType == 'success'){
          console.log('   -- adding: ',chat_to_send.title)
          sleep.sleep(1)
          handleChats(varietal, chats, varietals)
        }else{
          console.log('ERROR: --------$$$$$$$------',body, error, varietal.id, chat_to_send.order)
          tryagain.push(chat_to_send.id);
          handleChats(varietal, chats, varietals);
        }

     });
  }
}

function handleVaritals(varietals){

  if(varietals.length<1){
    console.log('done: ',tryagain)
    return
  }
  let varietal = varietals.pop();
  console.log('@handleing: ',varietal.name)
  varietal.getChats({order:[ 'order']}).then((chats)=>{
    handleChats(varietal, chats, varietals);
  })
}

db.Varietals.all().then((varietals)=>{
  handleVaritals(varietals)
})


// db.VarietalsChats.findAll({where:{id:[748, 747, 746, 648]}}).then((chats)=>{
//   chats.forEach((chat)=>{
//     sleep.sleep(1)
//     chat.getVarietal().then((varietal)=>{
//       console.log(varietal)
//
//     let plain_varital = varietal.get({plain:true});
//     plain_varital.chat = chat.get({plain:true})
//     // varietal = itentGen();
//     plain_varital = itentGen(plain_varital);
//     request.post({
//       headers: {
//         'Authorization': `Bearer 12242d9207544c9a8d265cc46c4e7c4e`,
//         'Content-Type': 'application/json; charset=utf-8',
//       },
//       url: api_endpoint,
//       body: JSON.stringify(plain_varital)
//       }, function(error, response, body) {
//         body  = JSON.parse(body)
//         if(body.status.errorType == 'success'){
//           console.log('   -- adding: ',chat.title)
//
//         }
//
//      });
//    })
//    })
// })
