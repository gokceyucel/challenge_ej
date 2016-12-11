'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routes from './some_page.routes';

export class SomePageController {

  /*@ngInject*/
  constructor() {
    this.title = 'Some Page';
    this.itemCount = 9;
    this.getNumber = num => new Array(num);
  }
}

export default angular.module('emlakjetChallengeApp.some_page', [uiRouter])
  .config(routes)
  .component('somePage', {
    template: require('./some_page.html'),
    controller: ['AuthService', 'EventService', 'Events', SomePageController],
  })
  .name;
