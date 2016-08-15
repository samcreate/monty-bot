
import Sessions from './sessions';
import EventEmitter from 'eventemitter3';
import firstEntityValue from './utils/first-entity-value'

class Actions extends EventEmitter {
  constructor() {
    super();
  }

  send({sessionId, context} , {text, quickreplies}) {

    // Our bot has something to say!
    // Let's retrieve the Facebook user whose session belongs to
    //console.log('hhahahaha', arguments)

    const recipientId = Sessions.instance.store[sessionId].fbid;
    // context.food = 'salmon';
    if (recipientId) {
      // Yay, we found our recipient!
      // Let's forward our bot response to her.
      // We return a promise to let our bot know when we're done sending
      // return facebook.send.text(recipientId, text, quickreplies)
      // .then(() => null)
      // .catch((err) => {
      //   console.error(
      //     'Oops! An error occurred while forwarding the response to',
      //     recipientId,
      //     ':',
      //     err.stack || err
      //   );
      // });
      console.log('send action called?')
      context.fart = 'hahah';
      this.emit('send-facebook-message', {recipientId, text, quickreplies,context});
      return Promise.resolve();

    } else {
      console.error('Oops! Couldn\'t find user for session:', sessionId);
      // Giving the wheel back to our bot
      return Promise.resolve()
    }
  }

  merge({sessionId, context, text, entities}) {
    // Retrieve the location entity and store it into a context field
    // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
    // console.log('merge called: ', entities)
    // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
    return new Promise(function(resolve, reject) {
      const food = firstEntityValue(entities, 'food');
      const flavor = firstEntityValue(entities, 'flavor');

      if (food) {
        context.food = food;
      }
      if (flavor) {
        context.flavor = flavor;
      }
      //call the API here
      return resolve(context);
    });
    // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
    // console.log('merge done');
    // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
  }

  getWinesForFood({sessionId, context, flavor}) {

    // console.log('------> getWinesForFood:  ', {
    //   sessionId,
    //   context,
    //   flavor
    // })

    const recipientId = Sessions.instance.store[sessionId].fbid;

    context.flavor = flavor;

    this.emit('send-facebook-card', {recipientId, context});

    return new Promise(function(resolve, reject) {

      return resolve(context);
    });

  //return Promise.resolve(context);
  }

  clearContext({context}) {
    return new Promise(function(resolve, reject) {
      context = {};
      //call the API here
      return resolve(context);
    });
  }
  getName({context}) {
    return new Promise(function(resolve, reject) {
      context.name = 'Aaron';
      //call the API here
      return resolve(context);
    });
  }

}

module.exports = Actions;
