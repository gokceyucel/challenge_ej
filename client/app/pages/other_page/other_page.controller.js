'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routes from './other_page.routes';

export class OtherPageController {
  /*@ngInject*/
  constructor() {
    this.title = 'Other Page';
    this.itemCount = 8;
    this.getNumber = num => new Array(num);
  }
}

export default angular.module('emlakjetChallengeApp.other_page', [uiRouter])
  .config(routes)
  .component('otherPage', {
    template: require('./other_page.html'),
    controller: OtherPageController,
  })
  .name;
