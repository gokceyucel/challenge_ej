'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routes from './main.routes';

export class MainController {
}

export default angular.module('emlakjetChallengeApp.main', [uiRouter])
  .config(routes)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
