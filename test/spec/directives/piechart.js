'use strict';

describe('Directive: pieChart', function () {

  // load the directive's module
  //beforeEach(module('offrApp'));

  var element,
    scope,
    $compile, $rootScope, $window, mockd3Service, $q;

  beforeEach(function(){
    mockd3Service = {};
    module('offrApp');

    module(function($provide){
        $provide.value('d3Service', mockd3Service)
    })

    inject(function(_$compile_, _$rootScope_, _$window_, _$q_) {
        $window = _$window_;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $q = _$q_
    });

    mockd3Service.d3 = function() {
        var deferred = $q.defer();
        deferred.resolve($window.d3)
        return deferred.promise;
    }

    //scope = $rootScope.$new();
    var data = [
        {"tag": "JavaScript", "expertise": 34},
        {"tag": "D3", "expertise": 45},
        {"tag": "Angular", "expertise": 37},
        {"tag": "Ember", "expertise": 56},
        {"tag": "Grunt", "expertise": 77},
        {"tag": "Gulp", "expertise": 84},
        {"tag": "Bower", "expertise": 27},
        {"tag": "NPM", "expertise": 76},
        {"tag": "Git", "expertise": 40},
        {"tag": "Svn", "expertise": 37}
      ];

    element = angular.element('<pie-chart hardskill="hardskill"></pie-chart>');
    element = $compile(element)($rootScope);
    $rootScope.hardskill = data;
    $rootScope.$digest();
  });


  it('should have initialized dom elements', inject(function ($compile) {
    expect(element.length).toBe(1);
    expect(element.children().length).toBe(1);
    expect(element.find('#path_Angular').length).toBe(1);
    expect(element.find('.arc').length).toBe(10);
  }));
});
