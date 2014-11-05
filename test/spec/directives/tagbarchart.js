'use strict';

describe('Directive: tagBarChart', function () {

  // load the directive's module
  beforeEach(module('offrApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<tag-bar-chart></tag-bar-chart>');
    element = $compile(element)(scope);
    //expect(element.text()).toBe('this is the tagBarChart directive');
  }));
});
