'use strict';

describe('Component: badge', function() {
  // load the component's module
  beforeEach(module('emlakjetChallengeApp.badge'));

  var badgeComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    badgeComponent = $componentController('badge', {});
  }));

  it('should ...', function() {
    1.should.equal(1);
  });
});
