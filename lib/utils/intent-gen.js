module.exports = (variteal) => {

return {
  name: `variteal learning - ${variteal.name} - 1 start`,
  auto: true,
  contexts: [],
  contextOut: [
     {
        name: variteal.context_name,
        lifespan: 2
     }
  ],
  templates: [
    "Do you know anything about @Varietals:Varietals ?",
    "What is @Varietals:Varietals ?",
    "Tell me about @Varietals:Varietals ",
    `${variteal.name}`
  ],
  userSays: [
    {
      data: [
        {
          text: `${variteal.name}`
        }
      ],
      isTemplate: true,
      count: 1,
    },
    {
      data: [
        {
          text: "Do you know anything about "
        },
        {
          text: `${variteal.name}`,
          alias: "Varietals",
          meta: "@Varietals",
          userDefined: true
        },
        {
          text: "?"
        }
      ],
      isTemplate: false,
      count: 0,
    },
    {
      data: [
        {
          text: "What is "
        },
        {
          text: `${variteal.name}`,
          alias: "Varietals",
          meta: "@Varietals",
          userDefined: true
        },
        {
          text: "?"
        }
      ],
      isTemplate: false,
      count: 0,
    },
    {
      data: [
        {
          text: "Tell me about "
        },
        {
          text: `${variteal.name}`,
          alias: "Varietals",
          meta: "@Varietals",
          userDefined: true
        }
      ],
      isTemplate: false,
      count: 0,
    },
    {
      data: [
        {
          text: `${variteal.name}`
        }
      ],
      isTemplate: true,
      count: 0,
    }
  ],

  responses: [
    {
      resetContexts: false,
      affectedContexts: [
        {
          name: `${variteal.name}`,
          lifespan: 2
        }
      ],
      parameters: [
        {
          dataType: "@Varietals",
          name: "Varietals",
          value: "$Varietals",
          isList: false
        }
      ],
      messages: [
        {
          type: 0,
          speech: variteal.description
        },
        {
          title: "",
          replies: [
            "More"
          ],
          type: 2
        }
      ]
    }
  ],
  priority: 500000
}
}
