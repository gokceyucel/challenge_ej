'use strict';

export default class AdminController {
  /*@ngInject*/
  constructor(UserResource) {
    // Use the User $resource to fetch all users
    this.users = UserResource.query();
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}
