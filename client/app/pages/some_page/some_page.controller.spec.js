'use strict';

describe('Component: SomePageComponent', function() {
  // load the controller's module
  beforeEach(module('emlakjetChallengeApp.some_page'));

  var SomePageComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    SomePageComponent = $componentController('some_page', {});
  }));

  it('should ...', function() {
    // 1.should.equal(1);
  });
});
