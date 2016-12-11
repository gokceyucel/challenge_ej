'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('other_page', {
      url: '/other_page',
      template: '<other-page></other-page>',
      authenticate: true
    });
}
