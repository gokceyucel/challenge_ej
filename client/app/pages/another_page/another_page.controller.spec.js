'use strict';

describe('Component: AnotherPageComponent', function() {
  // load the controller's module
  beforeEach(module('emlakjetChallengeApp.another_page'));

  var AnotherPageComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    AnotherPageComponent = $componentController('another_page', {});
  }));

  it('should ...', function() {
    // 1.should.equal(1);
  });
});
