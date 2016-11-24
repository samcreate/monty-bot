module.exports = ({title, payload, type}) => {
  let button = {
    "type": type,
    "title": title,
    "payload": payload
  }
  return button;
};
