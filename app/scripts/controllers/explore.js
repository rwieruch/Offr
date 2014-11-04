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
	    $scope.users = data;
	    $scope.selectedUser = data[0];  
	    $scope.hardskill = data[0].hardskill;   
	}, function(err){
	    console.log('request failed');
	});

  $scope.changeSelectedUser = function(user) {
    $scope.selectedUser = user;
    $scope.hardskill = user.hardskill;  
  }
}]);
