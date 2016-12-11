'use strict';

import angular from 'angular';

export default class SignupController {
  user = {
    name: '',
    email: '',
    password: ''
  };
  errors = {};
  submitted = false;
  inviteToken;
  inviteValid = false;

  /*@ngInject*/
  constructor(AuthService, EventService, Events, $state, $http) {
    this.AuthService = AuthService;
    this.EventService = EventService;
    this.Events = Events;
    this.$http = $http;
    this.$state = $state;
    this.inviteToken = window.location.search.substr(1);
  }

  getInviteByToken(token, next) {
    this.$http.get(`/api/invites/token/${token}`)
      .then(response => {
        // invite is valid since we got inviteData by token
        let inviteData = response.data;
        this.inviteValid = true;
        next(null, inviteData);
      })
      .catch(err => {
        // Invite token is invalid
        // return null if invite not found
        // return error if error is something else
        return err.status === 404 ? next(null) : next(err);
      });
  }

  createUser(next) {
    this.AuthService.createUser({
      name: this.user.name,
      email: this.user.email,
      password: this.user.password
    })
      .then(() => {
        // redirect to home
        this.$state.go('main');
        next(null);
      })
      .catch(err => {
        err = err.data;
        this.errors = {};

        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, (error, field) => {
          form[field].$setValidity('mongoose', false);
          this.errors[field] = error.message;
        });

        next(err);
      });
  }

  register(form) {
    this.submitted = true;

    if (form.$valid) {
      this.createUser(err => {
        if (err) throw err;

        if (this.inviteToken) {
          this.getInviteByToken(this.inviteToken, (err, inviteData) => {
            if (err) throw err;

            // check if token is valid for registering user
            if (this.inviteValid && inviteData.invited_email === this.user.email) {
              this.EventService.addEventScore(this.Events.Invite, inviteData.inviting_user_id);
            }
          });
        }
      });
    }
  }
}
