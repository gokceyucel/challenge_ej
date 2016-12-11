'use strict';

import angular from 'angular';

/*@ngInject*/
export function EventService($http, AuthService) {
  let getBadges = next =>
    $http
      .get('/api/events')
      .then(response => next(null, response.data.map(event => event.badge)))
      .catch(err => next(err));

  let addBadgeScore = (badge, user_id) =>
    $http
      .post('/api/user_scores', {
        user_id: user_id,
        // badge_id: badge._id,
        type: 'badge',
        score: badge.score
      });

  let giveBadgeToUser = (user_id, badge) => {
    if (!currentUserHasBadge(badge.name)) {
      /*console.log(`current user doesn't have ${badge.name} badge.`);
      console.log(AuthService.getCurrentUserSync().badges);*/

      $http
        .put(`/api/users/${user_id}/badge`, {
          user_id: user_id,
          badge: badge
        })
        .then(() => {
          addBadgeScore(badge, user_id);
          AuthService.getCurrentUserSync().badges.push(badge);
        });
    }
  };

  let currentUserHasBadge = badgeName => AuthService.getCurrentUserSync().badges.map(badge => badge.name).includes(badgeName);

  let getEvents = () => $http.get('/api/events');

  let addEventScore = (event, user_id) =>
    $http
      .post('/api/user_scores', {
        user_id: user_id,
        event_id: event._id,
        type: 'event',
        score: event.score
      })
      .then(() => {
        if (!currentUserHasBadge(event.badge.name)) {
          checkBadgeEarned(event, user_id);
        }
      });

  let getUserScoresByEventId = (user_id, event_id) => $http.get('/api/user_scores/user/' + user_id + '/event/' + event_id);

  let checkBadgeEarned = (event, user_id) => {
    /*console.log('checking if "' + event.badge.name + ' badge" earned for this "' + event.name + ' event"');
     console.log(event);
     console.log('required ' + event.name + ' event count: ' + event.badge.event_count);*/

    getUserScoresByEventId(user_id, event._id)
      .then(response => {
        let userEvents = response.data;
        let userEventsCount = userEvents.length;
        // console.log(userEvents);
        // console.log('user has ' + userEventsCount + ' ' + event.name + ' event.');

        if (userEventsCount >= event.badge.event_count) {
          // console.log('user should earn a ' + event.badge.name + ' badge !!!');

          giveBadgeToUser(user_id, {name: event.badge.name, score: event.badge.score});
        } else {
          // let diff = event.badge.event_count - userEventsCount;
          // console.log('user needs ' + diff + ' more ' + event.name + ' event');
        }
      });
  };

  return {
    getEvents,
    addEventScore,
    checkBadgeEarned,
    getBadges,
    addBadgeScore,
    giveBadgeToUser
  };
}

export default angular.module('emlakjetChallengeApp.event', [])
  .service('EventService', EventService)
  .name;
