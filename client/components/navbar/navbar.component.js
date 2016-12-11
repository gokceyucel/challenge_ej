'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarController {

  menu = [{
    title: 'Home',
    state: 'main'
  }, {
    title: 'Profile',
    state: 'profile'
  }, {
    title: 'Some Page',
    state: 'some_page'
  }, {
    title: 'Other Page',
    state: 'other_page'
  }, {
    title: 'Another Page',
    state: 'another_page'
  }, {
    title: 'Invite Page',
    state: 'invite'
  }];

  constructor(AuthService) {
    'ngInject';

    this.isLoggedIn = AuthService.isLoggedInSync;
    this.isAdmin = AuthService.isAdminSync;
    this.getCurrentUser = AuthService.getCurrentUserSync;
  }
}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarController
  })
  .name;
