'use strict';

import uuidV4 from 'uuid/v4';

export default class InviteController {
  user = {
    name: '',
    email: '',
    password: ''
  };
  errors = {
    login: undefined
  };
  submitted = false;
  location = window.location;
  inviteUrl = '';

  /*@ngInject*/
  constructor(AuthService, $state) {
    this.AuthService = AuthService;
    this.getCurrentUser = AuthService.getCurrentUserSync;
    this.$state = $state;
    this.title = 'Invite Page';
  }

  invite(form) {
    this.submitted = true;

    if (form.$valid) {
      const inviteToken = uuidV4();

      this.AuthService.createInvite({
        inviting_user_id: this.getCurrentUser()._id,
        invited_email: this.user.email,
        token: inviteToken
      })
        .then(() => {
          this.inviteUrl = window.location.origin + '/signup?' + inviteToken;
        })
        .catch(err => {
          this.errors.login = err.message;
        });
    }
  }
}
