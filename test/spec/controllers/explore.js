'use strict';

describe('Controller: ExploreCtrl', function () {

  // load the controller's module
  beforeEach(module('offrApp'));

  var ExploreCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('users/users.json').
        respond([
          { 
              "id": 0, 
              "imageUrl": "images/placeholder_user.jpg", 
              "name": "Juri Jar", 
              "description": "Lorem ipsum",
              "hardskill": [
                  {"tag": "JavaScript", "expertise": 34},
                  {"tag": "D3", "expertise": 45},
                  {"tag": "Angular", "expertise": 37},
                  {"tag": "Ember", "expertise": 56},
                ]
          },  
          { 
              "id": 1, 
              "imageUrl": "images/placeholder_user.jpg", 
              "name": "Gari Gur", 
              "description": "Lila laune",
              "hardskill": [
                  {"tag": "JavaScript", "expertise": 54},
                  {"tag": "D3", "expertise": 25},
                  {"tag": "Angular", "expertise": 67},
                ]
          }
    ]);

    scope = $rootScope.$new();
    ExploreCtrl = $controller('ExploreCtrl', {
      $scope: scope
    });
  }));

  it('should have a nulled hovered variable', function () {
    expect(scope.hovered).toBe(null);
  });

  it('should have a user list', function () {
    //expect(scope.users).toEqual([]);
    $httpBackend.flush();

    /*expect(scope.users).toEqual([
        { 
            "id": 0, 
            "imageUrl": "images/placeholder_user.jpg", 
            "name": "Juri Jar", 
            "description": "Lorem ipsum",
            "hardskill": [
                {"tag": "JavaScript", "expertise": 34},
                {"tag": "D3", "expertise": 45},
                {"tag": "Angular", "expertise": 37},
                {"tag": "Ember", "expertise": 56},
              ]
        },  
        { 
            "id": 1, 
            "imageUrl": "images/placeholder_user.jpg", 
            "name": "Gari Gur", 
            "description": "Lila laune",
            "hardskill": [
                {"tag": "JavaScript", "expertise": 54},
                {"tag": "D3", "expertise": 25},
                {"tag": "Angular", "expertise": 67},
              ]
        }
    ]);*/

  });
});
