'use strict';

import db from '../models';
import Sessions from '../lib/sessions';
import moment from 'moment';
import config from 'config';


db.sequelize.sync()
  .then(() => {
    Sessions.instance.getActiveSessions().then((sessions) => {
      sessions.forEach((session) => {
        let startTime = moment(session.get('updatedAt'));
        let endTime = moment(new Date().toISOString());
        let duration = moment.duration(endTime.diff(startTime));
        let time_alive_inminutes = duration.asMinutes();
        let time_alive_inhours = duration.asHours();
        console.log('Session might be destroyed?:', 'time_alive_inminutes: ', time_alive_inminutes, ', for user:', session.get('UserUid'), ', keep alive?:', session.get('keep_alive'));
        if (time_alive_inminutes > 5 && session.get('keep_alive') === false) {
          console.log('Session:', session.get('id'), 'for:', session.get('UserUid'), 'has been destroyed');
          session.destroy();
        } else if (session.get('keep_alive') === true && time_alive_inhours > (config.get('FOLLOUP_TIME_HOURS') + 1)) {
          //kill the session if it's past the followup time plus one hour for some flexability in repsonse time
          console.log('Session:keepalive', session.get('id'), 'for:', session.get('UserUid'), 'has been destroyed');
          session.destroy();
        } else {
          console.log('Session:status', session.get('id'), 'for:', session.get('UserUid'), time_alive_inhours);
        }
        console.log('endTime::::', time_alive_inminutes);
        process.on('SIGINT', () => {
          db.close();
          process.exit();
        });
      });
    });
  })
  .catch((err) => {
    console.log("ERROR: ", err);
  })
