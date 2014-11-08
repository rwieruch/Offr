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
	    $scope.hardskill = data[0].hardskill;   
	}, function(err){
	    console.log('request failed');
	});

  $scope.changeSelectedUser = function(user) {
    $scope.selecteduser = user;
  }

  $scope.compareuser = null;
  $scope.mouseOverUser = function(user) {
    $scope.compareuser = user;
	}
  $scope.mouseLeaveUser = function() {
    $scope.compareuser = null;
	}

	$scope.hovered = null;
  $scope.hoveredfrom = function(d){
    $scope.hovered = d;
    $scope.$apply();
	};
}]);
