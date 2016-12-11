'use strict';

describe('Component: OtherPageComponent', function() {
  // load the controller's module
  beforeEach(module('emlakjetChallengeApp.other_page'));

  var OtherPageComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    OtherPageComponent = $componentController('other_page', {});
  }));

  it('should ...', function() {
    // 1.should.equal(1);
  });
});
