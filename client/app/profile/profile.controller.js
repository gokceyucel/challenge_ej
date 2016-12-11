'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routes from './profile.routes';

export class ProfileController {
}

export default angular.module('emlakjetChallengeApp.profile', [uiRouter])
  .config(routes)
  .component('profile', {
    template: require('./profile.html'),
    controller: ProfileController
  })
  .name;
