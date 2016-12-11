/**
 * UserScore model events
 */

'use strict';

import {EventEmitter} from 'events';
import UserScore from './user_score.model';
var UserScoreEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
UserScoreEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  UserScore.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    UserScoreEvents.emit(`${event}:${doc._id}`, doc);
    UserScoreEvents.emit(event, doc);
  };
}

export default UserScoreEvents;
