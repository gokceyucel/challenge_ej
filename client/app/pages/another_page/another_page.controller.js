'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routes from './another_page.routes';

export class AnotherPageController {
  /*@ngInject*/
  constructor() {
    this.title = 'Another Page';
    this.itemCount = 10;
    this.getNumber = num => new Array(num);
  }
}

export default angular.module('emlakjetChallengeApp.another_page', [uiRouter])
  .config(routes)
  .component('anotherPage', {
    template: require('./another_page.html'),
    controller: AnotherPageController,
  })
  .name;
