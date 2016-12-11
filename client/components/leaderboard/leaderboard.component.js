'use strict';

import angular from 'angular';
import _ from 'lodash';

export class LeaderboardController {

  leadersOverall = [];
  leadersWeekly = [];

  /*@ngInject*/
  constructor($http, EventService, AuthService) {
    this.EventService = EventService;
    this.AuthService = AuthService;
    this.$http = $http;
    this.getCurrentUser = AuthService.getCurrentUserSync;
  }

  $onInit() {
    this.getScores();
  }

  getScores() {
    this.$http
      .get('/api/user_scores')
      .then(response => {
        if (response.data.length > 0) {
          const rawOverallScores = response.data;

          // get leaderboeard user ids
          let leaderUserIds = _.map(_.uniqBy(rawOverallScores, 'user_id'), userScore => userScore.user_id);

          // get users for usernames
          this.$http
            .get('/api/users')
            .then(response => {

              // filter results for leader users
              let userIdsNames = response.data
                .map(user => ({user_id: user._id, username: user.name}))
                .filter(user => leaderUserIds.includes(user.user_id));

              // parse scores
              const rawWeeklyScores = rawOverallScores
                .filter(userScore => new Date(userScore.created_at) > this.constructor.dateOneWeekAgo());
              this.leadersOverall = this.constructor.sortUserScores(rawOverallScores);
              this.leadersWeekly = this.constructor.sortUserScores(rawWeeklyScores);

              // set missing usernames
              this.leadersOverall.forEach(leader => {
                userIdsNames.forEach(userIdName => {
                  if (leader.userId === userIdName.user_id) {
                    leader.username = userIdName.username;
                  }
                });
              });
              this.leadersWeekly.forEach(leader => {
                userIdsNames.forEach(userIdName => {
                  if (leader.userId === userIdName.user_id) {
                    leader.username = userIdName.username;
                  }
                });
              });
            });
        }
      })
      .catch(err => {
        throw err;
      });
  }

  static dateOneWeekAgo() {
    let oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return oneWeekAgo;
  }

  static sortUserScores(rawUserScores) {
    return _.sortBy(_.map(_.groupBy(rawUserScores, 'user_id'), (userScores, userId) => ({
      userId,
      username: userId, // TODO: need username
      score: userScores
        .map(userScore => userScore.score)
        .reduce((a, b) => a + b)
    })), 'score').reverse();
  }
}

export default angular.module('directives.leaderboard', [])
  .component('leaderboard', {
    template: require('./leaderboard.html'),
    controller: LeaderboardController
  })
  .name;
