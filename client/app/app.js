'use strict';

import angular from 'angular';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import uiRouter from 'angular-ui-router';
import {routeConfig} from './app.config';
import AuthService from '../components/auth/auth.module';
import EventService from '../services/event/event.service';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import clicker from '../components/clicker/clicker.directive';
import badge from '../components/badge/badge.component';
import leaderboard from '../components/leaderboard/leaderboard.component';
import main from './main/main.controller';
import constants from './app.constants';
import util from '../components/util/util.module';
import profile from './profile/profile.controller';
import some_page from './pages/some_page/some_page.controller';
import other_page from './pages/other_page/other_page.controller';
import another_page from './pages/another_page/another_page.controller';
import './app.css';

angular.module('emlakjetChallengeApp', [
  ngCookies,
  ngResource,
  ngSanitize,
  uiRouter,
  AuthService,
  EventService,
  account,
  admin,
  navbar,
  footer,
  main,
  constants,
  util,
  profile,
  some_page,
  other_page,
  another_page,
  clicker,
  badge,
  leaderboard
])
  .config(routeConfig)
  .run(function ($rootScope, $location, AuthService, EventService, Events, Util) {
    'ngInject';

    // Variable to prevent multiple scrolling on the same page
    let scrolledEnough = false;
    const scrollPercentage = 80;

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', (event, next) => {
      // Reset scrolling variable after state changes
      scrolledEnough = false;

      // Redirect to login if necessary
      AuthService.isLoggedIn(function (loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });

    // Get event info on application start
    EventService.getEvents()
      .then(response => {
        response.data.forEach(event => {
          switch (event.name) {
            case 'Click':
              Events.Click = event;
              break;
            case 'Scroll':
              Events.Scroll = event;
              break;
            case 'Invite':
              Events.Invite = event;
              break;
            default:
              break;
          }
        });
      });

    // Watch scroll behavior, add event if necessary
    angular.element(window).bind('scroll', () => {
      if (!scrolledEnough && Util.scrollPercentage() >= scrollPercentage) {
        scrolledEnough = true;
        EventService.addEventScore(Events.Scroll, AuthService.getCurrentUserSync()._id);
      }
    });

  })
  .value('Events', {
    Click: {},
    Scroll: {},
    Invite: {},
    /*Change: 4,
     Subscription: 5*/
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['emlakjetChallengeApp'], {
      strictDi: true
    });
  });
