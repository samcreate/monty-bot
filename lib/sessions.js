'use strict';

import db from '../models';
import fetch from 'node-fetch';
import config from 'config';


let singleton = Symbol();
let singletonEnforcer = Symbol();

class Sessions {

  /**
   * @param enforcer
   */
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw "Cannot construct singleton"
    }
  }

  findOrCreate(fbid, keep_alive = false) {
    return new Promise((resolve, reject) => {
      this._checkIfUserExists(fbid).then((user) => {
        return this._getSessionOrCreate(user, keep_alive);
      }).then(({user, session}) => {
        //console.log('here it is: ', session)
        resolve({
          user,
          session
        });
      }).catch(err => reject(err));
    });
  }

  getActiveSessions(plain=false) {
    return new Promise((resolve, reject) => {
      db.Session.findAll().then((sessions) => {
        if(plain){
          sessions = sessions.map(function(session){ return session.toJSON() });
        }
        resolve(sessions);
      }).catch(err => reject(err));
    });
  }

  _getSessionOrCreate(user, keep_alive) {
    return new Promise((resolve, reject) => {
      user.getSession().then((session) => {
        if (!session) {
          let tmp_context = [{
            name: "generic",
            parameters: {
              first_name: user.get('first_name')
            }
          }];
          db.Session.create({
            id: (new Date().toISOString()),
            store:{context:tmp_context},
            keep_alive: keep_alive
          }).then((session) => {
            user.setSession(session).then((user)=>{
              resolve({
                user,
                session
              });
            });

          }).catch(err => reject(err));
        } else {
          session.id = session.get('id');
          session.changed('updatedAt', true).save().then((session) => {
            resolve({
              user,
              session
            });
          }).catch(err => reject(err));

        }
      }).catch(err => reject(err));
    });
  }

  _checkIfUserExists(fbid) {
    return new Promise((resolve, reject) => {
      db.User.findById(fbid).then((user) => {
        if (!user) {
          this._getUserProfile(fbid).then((fb_user) => {
            //console.log("user0", fb_user);
            let {first_name, last_name, profile_pic, locale, timezone, gender} = fb_user;
            //console.log("user1");
            db.User.create({
              uid: fbid,
              first_name,
              last_name,
              profile_pic,
              locale,
              timezone,
              gender
            }).then((user) => {
              console.log("user created");
              resolve(user);
            }).catch(err => reject(err));

          }).catch(err => reject(err))
          //console.log('user1 ha')
        } else {
          //console.log('user already here brah')
          resolve(user);
        }
      }).catch(err => reject(err));
    });
  }
  _getUserProfile(fbid) {
    console.log('_getUserProfile', fbid, config.get('FB_PAGE_TOKEN'))
    const url = `https://graph.facebook.com/v2.6/${fbid}?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=${config.get('FB_PAGE_TOKEN')}`;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => {
          if (res.ok) {
            resolve(res.json());
          } else {
            reject('can\'t find user on the opengraph api');
          }
        }).catch(err => reject(err));
    });
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
