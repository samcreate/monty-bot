import config from 'config';
import db from './models';
import itentGen from './lib/utils/intent-gen'
import fs from 'fs'
import readline from 'readline'
import google from 'googleapis'
import googleAuth from 'google-auth-library'
import request from'request'

const api_endpoint = 'https://api.api.ai/v1/intents/'


let INTENT_IDS = [ '01076280-d366-4be7-bb89-3b96d75871de',
  '013735c4-96e7-4c2c-af72-ad1415ec0555',
  '04c42d08-816e-4fe3-88c7-c3c4e881ba53',
  '060818cd-c6c0-4a96-9177-4d798d8ac2a4',
  '13557e40-8b65-466a-a990-34e49bd3d35d',
  '1786f239-beb9-4cdc-9226-2ca13532d98e',
  '20573dc8-ca8d-441f-86f2-71544538b74d',
  '472083f6-a5f1-4c4e-9423-7a33589bc92e',
  '55dc1236-efb6-44d5-b25f-4b3e480cb5e0',
  '57d2c83f-4a21-41fc-9b27-b2500de27f07',
  '5b6c3727-79d2-4765-908e-2dbee5b34ccf',
  '5b8c798e-c02d-42b4-8b1a-25467cbbae4e',
  '6147ffa7-89e5-4a18-9b8a-cc686c0a3f9a',
  '63d38af3-85ad-4eb0-b917-ce999d071005',
  '655d9a55-0e30-490b-a756-003e5738352a',
  '668618af-bdec-4544-bd5c-d00ec2a14619',
  '6916252e-92fb-4227-b5ff-d531583cf778',
  '6f3c0f7f-c138-4eb3-b1ef-eb5be0923b19',
  '7306ece7-50e2-4398-9c79-5dbe2843a1c1',
  '749d9a37-d083-446c-898a-9f8a6ed0d214',
  '7828484e-12c1-4dba-ab1f-fe358244efc3',
  '869fb330-8f22-42df-ad1f-cf92c3091850',
  '8e1a0535-961a-44ce-b867-7cc600f6421e',
  '8edec195-f1b9-4e64-bedb-b0a991852254',
  '8f9196ab-163b-400d-adcd-cc29df76883a',
  '990f481f-b075-42e5-9a0a-ff79f718caad',
  'aa9a6ba7-4dcc-42f6-b1a1-7fb802d6b9a2',
  'b096b4d4-4970-43a2-9316-e17106584e4c',
  'b3b4d3fc-90d0-4a2f-99f6-42c5a929cb10',
  'be5eb662-7376-4875-8395-abe0582116f3',
  'bebb06f0-14a7-41f5-b22d-b78dbd25b3fc',
  'c2848e25-135a-44ad-b03b-125bed2ff430',
  'c3cca9b7-1a3b-4dde-8530-7ba0c2592611',
  'c848e464-29fc-489f-a564-ddeb3c413b38',
  'caa6e889-8a12-43e1-9e35-8f329fc1fc35',
  'cb7f1178-3834-43a6-b695-a8b8a1d07722',
  'd1f86527-9be3-4c5d-9e20-847b12e01540',
  'd35777bb-5e24-4c52-a7d8-b7c41bac46f0',
  'd3a3547e-46f1-4f84-9add-d6e9835cc21b',
  'd910dd37-f155-4b55-b58b-4595a89125c8',
  'e7c13377-3340-49aa-b7bd-9093d8b33484',
  'ee47b4df-32b0-4e5b-b402-a800218dfd50',
  'f1207e33-683a-4382-a6ba-a619c4373ee2',
  'fb72a464-28e9-40b9-ade2-42e1dd78d66a' ];



  function remove_intent(ids){
    let id_to_remove = ids.pop();
    let URL = api_endpoint+id_to_remove+'?v=20150910';
    console.log('id_to_remove: ', URL);
    request.delete({
      headers: {
        'Authorization': `Bearer 12242d9207544c9a8d265cc46c4e7c4e`,
      },
      url: URL,
    }, function(error, response, body) {
      if(error) return;

      console.log(body);
      remove_intent(INTENT_IDS);
    });
  }
  remove_intent(INTENT_IDS);


// request.get({
//   headers: {
//     'Authorization': `Bearer 12242d9207544c9a8d265cc46c4e7c4e`,
//     'Content-Type': 'application/json; charset=utf-8',
//   },
//   url: 'https://api.api.ai/v1/intents?v=20150910',
// }, function(error, response, body) {
//   body = JSON.parse(body)
//   let intent_ids = []
//   body.forEach((intent, i)=>{
//     console.log(intent)
//     if(intent.name.indexOf('variteal learning')!= -1){
//       intent_ids.push(intent.id)
//     }
//   })
//   console.log(intent_ids);
// });
