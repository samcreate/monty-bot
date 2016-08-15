'use strict';

/**
 * Created by Alexander Litvinov
 * Email: alexander@codeordie.ru
 * May be freely distributed under the MIT license
 */

let singleton = Symbol();
let singletonEnforcer = Symbol();

class Sessions {

    /**
     * @param enforcer
     */
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw "Cannot construct singleton"
        }else{
          this.store = {};
        }
    }

    findOrCreate(fbid) {
      let sessionId;
      // Let's see if we already have a session for the user fbid
      Object.keys(this.store).forEach(k => {
        if (this.store[k].fbid === fbid) {
          // Yep, got it!
          sessionId = k;
        }
      });
      if (!sessionId) {
        // No session found for user fbid, let's create a new one
        sessionId = new Date().toISOString();
        this.store[sessionId] = {fbid: fbid, context: {}};
      }
      return sessionId;
    }

    /**
     * @returns Singleton
     */
    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new Sessions(singletonEnforcer);
        }
        return this[singleton];
    }

}

export default Sessions;
