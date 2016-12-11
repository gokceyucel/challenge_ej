/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Event from '../api/event/event.model';
import Invite from '../api/invite/invite.model';
import UserScore from '../api/user_score/user_score.model';

User.find({}).remove()
  .then(() => {
    console.log('Users cleared. Populating...');

    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin',
    })
      .then(() => console.log('Users created.'));
  });

Event.find({}).remove()
  .then(() => {
    console.log('Events cleared. Populating...');

    Event.create({
      name: 'Click',
      info: 'Click event for clicking buttons',
      score: 10,
      badge: {
        name: 'Clicker',
        info: 'Clicker Badge earned by click events',
        score: 100,
        event_count: 5
      }
    }, {
      name: 'Scroll',
      info: 'Scrol event for scrolling 80% of pages',
      score: 10,
      badge: {
        name: 'Scroller',
        info: 'Scroller Badge earned by scroll events',
        score: 100,
        event_count: 5
      }
    }, {
      name: 'Invite',
      info: 'Invite event for inviting friends',
      score: 10,
      badge: {
        name: 'Friendly',
        info: 'Friendly Badge earned by invite events',
        score: 100,
        event_count: 5
      }
    })
      .then(() => console.log('Events created.'));
  });

Invite
  .find({})
  .remove()
  .then(() => console.log('Invites cleared.'));

UserScore
  .find({})
  .remove()
  .then(() => console.log('User scores cleared'));

