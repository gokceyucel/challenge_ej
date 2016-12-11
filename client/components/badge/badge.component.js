'use strict';

import angular from 'angular';

export class BadgeController {
  badges = [];

  /*@ngInject*/
  constructor($http, EventService, AuthService) {
    this.EventService = EventService;
    this.AuthService = AuthService;
    this.$http = $http;
    this.getCurrentUser = AuthService.getCurrentUserSync;
  }

  $onInit() {
    this.getBadges();
  }

  getBadges() {
    this.EventService.getBadges((err, badges) => {
      if (err) throw err;

      // get user badges
      const userOwnedBadgeNames = this.getCurrentUser().badges.map(userBadge => userBadge.name);

      // mark user earned badges
      badges.forEach(badge => badge.earned = userOwnedBadgeNames.includes(badge.name));
      this.badges = badges;
    });
  }
}

export default angular.module('directives.badge', [])
  .component('badge', {
    template: require('./badge.html'),
    controller: BadgeController
  })
  .name;
