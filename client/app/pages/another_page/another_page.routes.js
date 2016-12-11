'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('another_page', {
      url: '/another_page',
      template: '<another-page></another-page>',
      authenticate: true
    });
}
