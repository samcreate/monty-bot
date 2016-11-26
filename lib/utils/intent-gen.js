module.exports = (variteal) => {

  return {
    name: `variteal learning - ${variteal.name} - 4 - yes please!`,
    auto: true,
    contexts: [`${variteal.context_name}${3}`],
    contextOut: [
      {
        name: `${variteal.context_name}${3}`,
        lifespan: 2
      }
    ],
    templates: [
      "yes please!",
      "sure, why not",
      "yes",
      "sure",
      "yea"
    ],
    userSays: [
      {
        data: [
          {
            text: "yes please!"
          }
        ],
        isTemplate: false,
        count: 0,
      },
      {
        data: [
          {
            text: "sure, why not"
          }
        ],
        isTemplate: false,
        count: 0,
      },
      {
        data: [
          {
            text: "yes"
          }
        ],
        isTemplate: false,
        count: 0,
      },
      {
        data: [
          {
            text: "sure"
          }
        ],
        isTemplate: false,
        count: 0,
      },
      {
        data: [
          {
            text: "yea"
          }
        ],
        isTemplate: false,
        count: 1,
      }
    ],

    responses: [

      {
        resetContexts: true,
        action: "get-winesbyvarietal",
        affectedContexts: [
          {
            name: `${variteal.context_name}${3}`,
            lifespan: 5
          },
          {
            name: `${variteal.context_name}${3}`,
            lifespan: 5
          }
        ],
        parameters: [
          {
            dataType: "@sys.number-integer",
            name: "id",
            value: variteal.id
          }
        ],
        messages: [
          {
            type: 0,
            speech: "Great, take a look at these..."
          }
        ]
      }
    ],
    priority: 500000
  }
}
