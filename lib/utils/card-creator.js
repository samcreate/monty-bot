module.exports = ({title, hero, subtitle, buttons}) => {
  let card = {
    "title": title,
    "image_url": hero,
    "subtitle": subtitle,
    "buttons": buttons
  }
  return card;
};
