module.exports = ({id, title, hero, producer, vintage, url, price}) => {
  let card_item = {
    title: title,
    image_url: hero,
    subtitle: `${vintage} by ${producer}`,
    default_action: {
      type: "web_url",
      url: url
    },
    buttons: [
      {
        title: `Shop at $${price}`,
        type: "web_url",
        url: url
      }
    ]
  };
  return card_item;
};
