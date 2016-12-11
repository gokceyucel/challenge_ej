'use strict';

import angular from 'angular';

export default angular.module('emlakjetChallengeApp.clicker', [])
  .directive('clicker', ['AuthService', 'EventService', 'Events', (AuthService, EventService, Events) => {
    return {
      restrict: 'A',
      link: (scope, element) => {
        element.on('click', () => EventService.addEventScore(Events.Click, AuthService.getCurrentUserSync()._id));
      }
    };
  }])
  .name;
