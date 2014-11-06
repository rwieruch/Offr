'use strict';

/**
 * @ngdoc function
 * @name offrApp.controller:ExploreCtrl
 * @description
 * # ExploreCtrl
 * Controller of the offrApp
 */
angular.module('offrApp')
  .controller('ExploreCtrl', ['$scope', 'User', function($scope, User) {
	User.query(function(data){
	    $scope.users = data;;  
	    $scope.selecteduser = data[0];  
	    console.log($scope.selecteduser);
	    $scope.hardskill = data[0].hardskill;   
	}, function(err){
	    console.log('request failed');
	});

  $scope.changeSelectedUser = function(user) {
    $scope.selecteduser = user;
    $scope.hardskill = user.hardskill;  
  }

  $scope.hovered = null;
  $scope.mouseOverUser = function(user) {
    $scope.hovered = user;
	}
  $scope.mouseLeaveUser = function() {
    $scope.hovered = null;
	}
}]);
