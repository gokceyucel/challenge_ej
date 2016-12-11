'use strict';

describe('Directive: clickButtons', function() {
  // load the directive's module
  beforeEach(module('emlakjetChallengeApp.click-buttons'));

  var element,
    scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<click-buttons></click-buttons>');
    element = $compile(element)(scope);
    element.text().should.equal('this is the clickButtons directive');
  }));
});
