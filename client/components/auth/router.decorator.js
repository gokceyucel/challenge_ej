'use strict';

export function routerDecorator($rootScope, $state, AuthService) {
  'ngInject';
  // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role

  $rootScope.$on('$stateChangeStart', (event, next) => {
    if (!next.authenticate) {
      return;
    }

    if (typeof next.authenticate === 'string') {
      AuthService.hasRole(next.authenticate)
        .then(has => {
          if (has) {
            return;
          }

          event.preventDefault();
          return AuthService.isLoggedIn()
            .then(is => {
              $state.go(is ? 'main' : 'login');
            });
        });
    } else {
      AuthService.isLoggedIn()
        .then(is => {
          if (is) {
            return;
          }

          event.preventDefault();

          $state.go('login');
        });
    }
  });
}
