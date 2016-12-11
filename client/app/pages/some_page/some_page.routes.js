'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('some_page', {
      url: '/some_page',
      template: '<some-page></some-page>',
      authenticate: true
    });
}
