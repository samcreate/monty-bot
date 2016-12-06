module.exports = (variteal) => {
//
  function getUserSays(variteal){
    if( variteal.chat.order === 1){
      return [
       {
         data: [
           {
             text: `I\u0027m curious about ${variteal.name}`
           }
         ],
         isTemplate: false
       },
       {
         data: [
           {
             text: `what is ${variteal.name}?`
           }
         ],
         isTemplate: false
       },
       {
         data: [
           {
             text: `do you know anything about ${variteal.name}?`
           }
         ],
         isTemplate: false
       },
       {
         data: [
           {
             text: `tell me about ${variteal.name}?`
           }
         ],
         isTemplate: false
       },
       {
         data: [
           {
             text: variteal.name
           }
         ],
         isTemplate: true
       }
     ]
   }else{
     return [
       {
         data: [
           {
             text: `More`
           }
         ],
         isTemplate: false
       },
       {
         data: [
           {
             text: `sure`
           }
         ],
         isTemplate: false
       },
       {
         data: [
           {
             text: `why not`
           }
         ],
         isTemplate: false
       },
       {
         data: [
           {
             text: `okay`
           }
         ],
         isTemplate: false
       },
       {
         data: [
           {
             text: `yes`
           }
         ],
         isTemplate: false
       },
       {
         data: [
           {
             text: `ya`
           }
         ],
         isTemplate: false
       }
     ]
   }
  }
  function getMessages(variteal){
    if(variteal.chat.order === 6){
      return [
        {
          "type": 0,
          "speech": `That's all I have for now on ${variteal.name}. Would you like to see some of my favorites in this variteal?`
        },
        {
          "title": "",
          "replies": [
            "Sure!",
            "No Thanks"
          ],
          "type": 2
        }
      ]
    }else{
      return[
        {
          "type": 0,
          "speech": variteal.chat.chat
        },
        {
          "title": "",
          "replies": [
            "More"
          ],
          "type": 2
        }
      ]
    }
  }
  function getTemplate(variteal){
    if(variteal.chat.order === 1){
      return [
       `I\u0027m curious about ${variteal.name}`,
       `what is ${variteal.name}?`,
       `do you know anything about ${variteal.name}?`,
       `tell me about ${variteal.name}?`,
       `${variteal.name}`
     ];
   }else{
     return [
      `More`,
      'sure',
      'why not',
      'okay',
      'yes',
      'ya'
    ];
   }
  }
  function getContext(variteal){
    if(variteal.chat.order===1){
      return []
    }else{
      return [`${variteal.chat.context_name}${variteal.chat.order}`];
    }
  }

  let usersays = getUserSays(variteal);
  let template = getTemplate(variteal);
  let _messages = getMessages(variteal);
  let _contexts = getContext(variteal)
  // console.log(_contexts)
  return {
    name: variteal.chat.title,
    auto: true,
    contexts: _contexts,
    contextOut: [
      {
        name: `${variteal.chat.context_name}`+(variteal.chat.order+1),
        lifespan: 2
      }
    ],
    templates:template,
    userSays:usersays,
    responses: [

      {
        resetContexts: false,
        action: "",
        affectedContexts: [
          {
            name: `${variteal.chat.context_name}`+(variteal.chat.order+1),
            lifespan: 2
          }
        ],
        parameters: [
          {
            dataType: "@sys.number-integer",
            name: "id",
            value: variteal.id
          }
        ],
        messages: _messages
      }
    ],
    priority: 500000
  }
}





// {
//   templates: ,
//   userSays: [
//
//   ],
//   id: "ccd531e0-9482-43cb-aa52-7831a2b2870a",
//   name: "fart",
//   auto: true,
//   contexts: [],
//   responses: [
//     {
//       resetContexts: false,
//       action: "get-winesbyvarietal",
//       affectedContexts: [],
//       parameters: [
//         {
//           name: "id",
//           value: "22"
//         }
//       ],
//       messages: [
//
//       ]
//     }
//   ],
//   priority: 500000,
//   cortanaCommand: {
//     navigateOrService: "NAVIGATE",
//     target: ""
//   },
//   webhookUsed: false,
//   webhookForSlotFilling: false,
//   lastUpdate: 1480999168,
//   fallbackIntent: false,
//   events: []
// }
